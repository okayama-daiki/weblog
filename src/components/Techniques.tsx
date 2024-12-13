import { useState, useEffect, useRef } from "react";
import { Button, Input } from "@nextui-org/react";
import {
  Chart as ChartJs,
  ChartData,
  ChartOptions,
  LinearScale,
  PointElement,
  Point,
  CategoryScale,
  ScatterController,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJs.register(LinearScale, CategoryScale, PointElement, ScatterController);
ChartJs.defaults.backgroundColor = "#eee";
ChartJs.defaults.color = "darkgrey";
ChartJs.defaults.borderColor = "darkgrey";

const INITIAL_COWS = [0, 0, 1, 0, 1, 0, 0];

export function FaceTheRightWay({ n }: { n: number }) {
  const [cows, setCows] = useState<number[]>([...INITIAL_COWS]);
  const [k, setK] = useState(3);

  useEffect(() => {
    if (cows.every((cow) => cow === 1)) {
      console.log("All cows are facing right!");
    }
  }, [cows]);

  const reset = () => {
    setCows([...INITIAL_COWS]);
  };

  const updateK = (k: number) => {
    reset();
    setK(k);
  };

  const flip = (i: number) => {
    if (i + k > n) {
      return;
    }
    setCows((cows) => {
      const newCows = [...cows];
      for (let j = i; j < i + k; j++) {
        newCows[j] ^= 1;
      }
      return newCows;
    });
  };

  return (
    <div className="flex flex-col gap-5 my-5">
      <div className="flex flex-row gap-3">
        {cows.map((cow, i) => (
          <Button
            key={i}
            isIconOnly
            radius="full"
            color={cow === 1 ? "primary" : "secondary"}
            disabled={i + k > n}
            onClick={() => flip(i)}
          >
            {cow === 1 ? "→" : "←"}
          </Button>
        ))}
      </div>
      <div className="flex flex-row gap-2">
        <Input
          label="K"
          type="number"
          min={1}
          max={n}
          value={k.toFixed(0)}
          onChange={(e) => updateK(parseInt(e.target.value))}
          variant="flat"
          labelPlacement="outside-left"
          description="Number of cows to flip"
          className="w-40"
        ></Input>
        <Button onClick={reset}>Reset</Button>
      </div>
    </div>
  );
}

const INITIAL_TILE = [
  [1, 0, 0, 1],
  [0, 1, 1, 0],
  [0, 1, 1, 0],
  [1, 0, 0, 1],
];

export function Fliptile({ m, n }: { m: number; n: number }) {
  const [tile, setTile] = useState<number[][]>([
    ...INITIAL_TILE.map((row) => [...row]),
  ]);

  useEffect(() => {
    if (tile.every((row) => row.every((tile) => tile === 0))) {
      console.log("All tiles are white!");
    }
  }, [tile]);

  const reset = () => {
    setTile([...INITIAL_TILE.map((row) => [...row])]);
  };

  const flip = (i: number, j: number) => {
    if (!(0 <= i && i < m && 0 <= j && j < n)) {
      return;
    }

    const newTile = tile.map((row) => [...row]);
    newTile[i][j] ^= 1;

    const di = [-1, 1, 0, 0];
    const dj = [0, 0, -1, 1];

    for (let k = 0; k < 4; k++) {
      const ni = i + di[k];
      const nj = j + dj[k];
      if (0 <= ni && ni < m && 0 <= nj && nj < n) {
        newTile[ni][nj] ^= 1;
      }
    }

    setTile(newTile);
  };

  return (
    <div className="flex flex-col gap-5 my-5">
      <div className="flex flex-col gap-3">
        {tile.map((row, i) => (
          <div key={i} className="flex flex-row gap-3">
            {row.map((tile, j) => (
              <Button
                key={j}
                isIconOnly
                radius="full"
                color={tile === 1 ? "primary" : "secondary"}
                onClick={() => flip(i, j)}
              ></Button>
            ))}
          </div>
        ))}
      </div>
      <div className="flex flex-row gap-2">
        <Button onClick={reset}>Reset</Button>
      </div>
    </div>
  );
}

function compress(data: number[]): Map<number, number> {
  const compressed: Map<number, number> = new Map();
  const unique = new Set([...data].sort((a, b) => a - b));
  const values = Array.from(unique);
  for (let i = 0; i < values.length; i++) {
    compressed.set(values[i], i);
  }
  return compressed;
}

export function Compress({ w, h, n }: { w: number; h: number; n: number }) {
  const isCompressedX = useRef(false);
  const isCompressedY = useRef(false);

  const chartRef = useRef<ChartJs>(null);
  const rawData = useRef<number[][]>(
    Array(n)
      .fill(0)
      .map(() => {
        const x = Math.floor(Math.random() * w);
        const y = Math.floor(Math.random() * h);
        return [x, y];
      })
  );

  const compressed_x = useRef(compress(rawData.current.map(([x, _]) => x)));
  const compressed_y = useRef(compress(rawData.current.map(([_, y]) => y)));

  const data = useRef<ChartData>({
    datasets: [
      {
        data: rawData.current.map(([x, y]) => ({
          x,
          y,
        })),
      },
    ],
  });

  const update = () => {
    for (let i = 0; i < n; i++) {
      (data.current.datasets[0].data[i] as Point).x = isCompressedX.current
        ? (compressed_x.current.get(rawData.current[i][0]) as number)
        : rawData.current[i][0];
      (data.current.datasets[0].data[i] as Point).y = isCompressedY.current
        ? (compressed_y.current.get(rawData.current[i][1]) as number)
        : rawData.current[i][1];
    }
    chartRef.current?.update();
  };

  const reset = () => {
    rawData.current = Array(n)
      .fill(0)
      .map(() => {
        const x = Math.floor(Math.random() * w);
        const y = Math.floor(Math.random() * h);
        return [x, y];
      });
    compressed_x.current = compress(rawData.current.map(([x, _]) => x));
    compressed_y.current = compress(rawData.current.map(([_, y]) => y));
    isCompressedX.current = false;
    isCompressedY.current = false;
    update();
  };

  const options: ChartOptions = {
    aspectRatio: w / h,
    scales: {
      x: {
        min: 0,
        max: w,
        position: "top",
        ticks: {
          stepSize: 1,
        },
      },
      y: {
        min: 0,
        max: h,
        position: "left",
        reverse: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="w-96">
        <Chart
          id="compress"
          type="scatter"
          ref={chartRef}
          data={data.current}
          options={options}
        />
      </div>
      <div className="flex flex-row gap-3">
        <Button
          onClick={() => {
            isCompressedX.current = !isCompressedX.current;
            update();
          }}
        >
          X
        </Button>
        <Button
          onClick={() => {
            isCompressedY.current = !isCompressedY.current;
            update();
          }}
        >
          Y
        </Button>
        <Button onClick={reset}>Reset</Button>
      </div>
    </div>
  );
}
