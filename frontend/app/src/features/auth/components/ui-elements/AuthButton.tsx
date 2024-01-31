import { Button } from "@chakra-ui/react";
import { FC, memo, ReactNode } from "react";

type Props = {
  children: ReactNode;
  isDisabled?: boolean;
  loading?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const AuthButton: FC<Props> = memo((props) => {
  const { children, isDisabled = false, loading = false, onClick } = props;
  return (
    <Button
      variant="primaryA"
      size="sm"
      onClick={onClick}
      isLoading={loading}
      isDisabled={isDisabled || loading}
      data-testid="loginButton"
    >
      {children}
    </Button>
  );
});

AuthButton.displayName = "AuthButton";
export default AuthButton;
