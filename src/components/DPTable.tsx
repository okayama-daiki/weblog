import { useState } from "react";
import {
  Button,
  ButtonGroup,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

type History = {
  step: number;
  dpTable: number[][];
  i: number;
  j: number;
};

export default function DPTable({
  createDPTable,
}: {
  createDPTable: () => History[];
}) {
  const [step, setStep] = useState(0);
  const histories = createDPTable();
  const tableHeight = histories[0].dpTable.length;
  const tableWidth = histories[0].dpTable[0].length;

  return (
    <div className="flex flex-col gap-3 my-4">
      <Table aria-label="Dynamic Programming Table" className="table-fixed">
        <TableHeader>
          {[
            <TableColumn key="header" className="w-20">
              i ＼ j
            </TableColumn>,
            ...Array(tableWidth)
              .fill(0)
              .map((_, column) => (
                <TableColumn key={column}>{column}</TableColumn>
              )),
          ]}
        </TableHeader>

        <TableBody>
          {histories[step].dpTable.map((row, i) => (
            <TableRow key={i}>
              {(columnKey) => {
                if (columnKey === "header") {
                  let className =
                    "group bg-default-100 whitespace-nowrap text-foreground-500 text-tiny font-semibold";
                  if (i === 0) {
                    className += " rounded-t-lg";
                  } else if (i === tableHeight - 1) {
                    className += " rounded-b-lg";
                  }
                  return <TableCell className={className}>{i}</TableCell>;
                }
                const j = Number(columnKey);
                const className =
                  i === histories[step].i && j === histories[step].j
                    ? "bg-primary-500 rounded"
                    : "";
                return <TableCell className={className}>{row[j]}</TableCell>;
              }}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ButtonGroup>
        <Button disabled={step === 0} onClick={() => setStep(step - 1)}>
          Previous
        </Button>
        <Button
          disabled={step === histories.length - 1}
          onClick={() => setStep(step + 1)}
        >
          Next
        </Button>
      </ButtonGroup>
    </div>
  );
}

export function knapsack01_rev() {
  const n = 4;
  const w = [2, 1, 3, 2];
  const v = [3, 2, 4, 2];
  const W = 5;

  const dp = Array(n + 1)
    .fill(0)
    .map(() => Array(W + 1).fill(-100));
  let step = 0;
  const histories = [
    { step: ++step, dpTable: dp.map((row) => [...row]), i: -1, j: -1 },
  ];

  for (let j = 0; j <= W; j++) {
    dp[n][j] = 0;
  }
  histories.push({
    step: ++step,
    dpTable: dp.map((row) => [...row]),
    i: -1,
    j: -1,
  });

  for (let i = n - 1; i >= 0; i--) {
    for (let j = 0; j <= W; j++) {
      if (j < w[i]) {
        dp[i][j] = dp[i + 1][j];
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i + 1][j - w[i]] + v[i]);
      }
      histories.push({
        step: ++step,
        dpTable: dp.map((row) => [...row]),
        i,
        j,
      });
    }
  }

  histories.push({
    step: ++step,
    dpTable: dp.map((row) => [...row]),
    i: -1,
    j: -1,
  });

  return histories;
}

export function knapsack01_fore() {
  const n = 4;
  const w = [2, 1, 3, 2];
  const v = [3, 2, 4, 2];
  const W = 5;

  const dp = Array(n + 1)
    .fill(0)
    .map(() => Array(W + 1).fill(-100));
  let step = 0;
  const histories = [
    { step: ++step, dpTable: dp.map((row) => [...row]), i: -1, j: -1 },
  ];

  for (let j = 0; j <= W; j++) {
    dp[0][j] = 0;
  }
  histories.push({
    step: ++step,
    dpTable: dp.map((row) => [...row]),
    i: -1,
    j: -1,
  });

  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= W; j++) {
      if (j < w[i]) {
        dp[i + 1][j] = dp[i][j];
      } else {
        dp[i + 1][j] = Math.max(dp[i][j], dp[i][j - w[i]] + v[i]);
      }
      histories.push({
        step: ++step,
        dpTable: dp.map((row) => [...row]),
        i: i + 1,
        j,
      });
    }
  }

  histories.push({
    step: ++step,
    dpTable: dp.map((row) => [...row]),
    i: -1,
    j: -1,
  });

  return histories;
}
