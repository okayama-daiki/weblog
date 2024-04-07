import { useState, useEffect, useRef } from "react";
import { graphviz, Engine } from "d3-graphviz";
import { Button, ButtonGroup } from "@nextui-org/react";

export default function Graph({
  dotStrings,
  engine,
}: {
  dotStrings: string[];
  engine?: Engine;
}) {
  const [step, setStep] = useState(0);
  const divRef = useRef<HTMLDivElement>(null);
  const key = Math.floor(Math.random() * 1000);

  useEffect(() => {
    if (!divRef.current) return;

    graphviz(divRef.current, { engine: engine || "neato" })
      .renderDot(dotStrings[step])
      .fit(true)
      // @ts-ignore / Arguments are inline properties of HTML tags, so some strings can also be used.
      .width("100%")
      // @ts-ignore
      .height("100%")
      .zoom(false)
      .transition(() => "ease");
  }, [step, key, dotStrings, engine]);

  return (
    <div className="flex flex-col gap-3 my-4">
      <div ref={divRef} className="rounded overflow-hidden [&>svg]:max-h-80" />
      <ButtonGroup>
        <Button disabled={step === 0} onClick={() => setStep(step - 1)}>
          Prev
        </Button>
        <Button
          disabled={step === dotStrings.length - 1}
          onClick={() => setStep(step + 1)}
        >
          Next
        </Button>
      </ButtonGroup>
    </div>
  );
}

export function GraphWithHTML({
  dotStrings,
  htmlStrings,
  engine,
}: {
  dotStrings: string[];
  htmlStrings: string[];
  engine?: Engine;
}) {
  const [step, setStep] = useState(0);
  const divRef = useRef<HTMLDivElement>(null);
  const key = Math.floor(Math.random() * 1000);

  useEffect(() => {
    if (!divRef.current) return;

    graphviz(divRef.current, { engine: engine || "neato" })
      .renderDot(dotStrings[step])
      .fit(true)
      // @ts-ignore
      .width("100%")
      // @ts-ignore
      .height("100%")
      .zoom(false)
      .transition(() => "ease");
  }, [step, key, dotStrings, engine]);

  return (
    <div className="flex flex-col gap-3 my-4">
      <div className="flex justify-center items-center flex-row min-h-72">
        <div dangerouslySetInnerHTML={{ __html: htmlStrings[step] }} />
        <div
          ref={divRef}
          className="rounded overflow-hidden [&>svg]:max-h-80"
        />
      </div>
      <ButtonGroup>
        <Button disabled={step === 0} onClick={() => setStep(step - 1)}>
          Prev
        </Button>
        <Button
          disabled={step === dotStrings.length - 1}
          onClick={() => setStep(step + 1)}
        >
          Next
        </Button>
      </ButtonGroup>
    </div>
  );
}
