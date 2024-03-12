import { useState, useEffect } from "react";

interface IProps {
  time?: number;
  onEnd: Function;
}

export const CountDown = (props: IProps) => {
  const { time, onEnd } = props;
  const [count, setCount] = useState(time || 60);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((count) => {
        if (count === 0) {
          clearInterval(id);
          onEnd && onEnd();
          return count;
        }
        return count - 1;
      });
    }, 1000);
    return () => {
      // 清除定时器
      clearInterval(id);
    };
  }, [time, onEnd]);

  return <div className="text-[#909090]">{`${count}秒后重新发送`}</div>;
};

