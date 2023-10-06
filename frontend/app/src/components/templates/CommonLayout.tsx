import { FC, memo, ReactNode } from "react";
import { Header } from "components/organisms/layout/Header";

type Props = {
  children: ReactNode;
};
export const CommonLayout: FC<Props> = memo((props) => {
  const { children } = props;
  return (
    <>
      <Header />
      {children}
    </>
  );
});
