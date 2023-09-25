import { Button } from "@chakra-ui/react";
import { FC, memo, ReactNode } from "react";

type Props = {
  children: ReactNode;
  isDisabled?: boolean;
  loading?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export const AuthButton: FC<Props> = memo((props) => {
  const {children, isDisabled = false, loading = false, onClick} = props;
  return (
    <Button variant="primaryA" size="sm" py="3" px="14" shadow="2xl" onClick={onClick} _hover={{opacity: 0.6}}
      textShadow="1px 1px 1px #000000" isLoading={loading} isDisabled={isDisabled || loading}>
      {children}
     </Button>
  );
});
