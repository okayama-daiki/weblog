import { useState, useEffect } from "react";
import {
  Button,
  ButtonGroup,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from "@nextui-org/react";

type History = {
  step: number;
  sieve: boolean[];
  target: number;
  isPrime: boolean;
};

export default function Sieve() {
  const n = 50;
  const [windowWidth, setWindowWidth] = useState(1300);
  const row = windowWidth > 1280 ? 10 : 5;
  const [step, setStep] = useState(0);
  const histories = createSieve(n);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });
  }, []);

  return (
    <div className="flex flex-col gap-3 my-4">
      <Table hideHeader aria-label="Sieve of Eratosthenes">
        <TableHeader>
          {Array(row)
            .fill(0)
            .map((_, column) => (
              <TableColumn key={column}>{column}</TableColumn>
            ))}
        </TableHeader>
        <TableBody>
          {Array(Math.ceil(n / row))
            .fill(0)
            .map((_, i) => (
              <TableRow key={i}>
                {(columnKey) => {
                  const index = Number(columnKey) + i * row + 1;
                  return (
                    <TableCell>
                      <Chip
                        variant={
                          histories[step].isPrime &&
                          histories[step].target === index
                            ? "shadow"
                            : "solid"
                        }
                        color={
                          histories[step].target === index
                            ? "success"
                            : histories[step].sieve[index]
                            ? "primary"
                            : "default"
                        }
                      >
                        {index}
                      </Chip>
                    </TableCell>
                  );
                }}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <ButtonGroup>
        <Button
          disabled={step === 0}
          onClick={() => {
            setStep(step - 1);
          }}
        >
          ←
        </Button>
        <Button
          disabled={step === histories.length - 1}
          onClick={() => {
            setStep(step + 1);
          }}
        >
          →
        </Button>
      </ButtonGroup>
    </div>
  );
}

function createSieve(n: number): History[] {
  const sieve = new Array(n + 1).fill(true);
  sieve[0] = sieve[1] = false;
  let step = 0;
  const histories = [
    { step: ++step, sieve: [...sieve], target: -1, isPrime: false },
  ];
  for (let i = 2; i <= n; i++) {
    if (sieve[i]) {
      histories.push({
        step: ++step,
        sieve: [...sieve],
        target: i,
        isPrime: true,
      });
      for (let j = i * i; j <= n; j += i) {
        sieve[j] = false;
        histories.push({
          step: ++step,
          sieve: [...sieve],
          target: j,
          isPrime: false,
        });
      }
    }
  }
  histories.push({
    step: ++step,
    sieve: [...sieve],
    target: -1,
    isPrime: false,
  });
  return histories;
}
