import * as fs from "fs";
import { glob } from "glob";

type Notebook = {
  cells: {
    cell_type: "markdown" | "code";
    source: string[];
  }[];
};

function convertNotebookToMarkdown(notebook: Notebook): string {
  return notebook.cells
    .map((cell) => {
      switch (cell.cell_type) {
        case "markdown":
          return cell.source.join("");
        case "code":
          return "```python\n" + cell.source.join("") + "\n```";
        default:
          return "";
      }
    })
    .join("\n\n");
}

function main() {
  const target_dir = "/src/pages/atcoder/programming-contest-challenge-book";
  const files = glob.sync(`.${target_dir}/*.ipynb`);
  for (const file of files) {
    const rawNotebook = fs.readFileSync(file).toString();
    const notebook = JSON.parse(rawNotebook) as Notebook;
    const markdown = convertNotebookToMarkdown(notebook);
    fs.writeFileSync(file.replace(/\.ipynb$/, ".md"), markdown);
  }
}

main();
