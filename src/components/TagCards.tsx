import { Cards, Card } from "nextra/components";

function TagCard({ name }: { name: string }) {
  return (
    <div>
      <Card icon={<></>} title={name} href={`/atcoder/tags/${name}`}>
        <></>
      </Card>
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
