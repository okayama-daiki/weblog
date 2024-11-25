import { Cards } from "nextra/components";

function TagCard({ name }: { name: string }) {
  return (
    <div>
      <Cards.Card icon={<></>} title={name} href={`/atcoder/tags/${name}`}>
        <></>
      </Cards.Card>
    </div>
  );
}
export default function TagCards({ names }: { names: string[] }) {
  return (
    <Cards>
      {names.map((name) => (
        <TagCard key={name} name={name} />
      ))}
    </Cards>
  );
}
