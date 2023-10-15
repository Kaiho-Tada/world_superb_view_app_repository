import Header from "components/organisms/layout/Header";
import { FC, memo, ReactNode } from "react";

type Props = {
  children: ReactNode;
};
const CommonLayout: FC<Props> = memo((props) => {
  const { children } = props;
  return (
    <>
      <Header />
      {children}
    </>
  );
});

CommonLayout.displayName = "CommonLayout";
export default CommonLayout;
