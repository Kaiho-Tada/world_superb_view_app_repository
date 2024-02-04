import { Button } from "@chakra-ui/react";
import { FC, memo, ReactNode } from "react";

type Props = {
  children: ReactNode;
  isDisabled?: boolean;
  loading?: boolean;
};

const AuthButton: FC<Props> = memo((props) => {
  const { children, isDisabled = false, loading = false } = props;

  return (
    <Button
      type="submit"
      variant="primaryA"
      size="sm"
      isLoading={loading}
      isDisabled={isDisabled || loading}
      data-testid="auth-button"
    >
      {children}
    </Button>
  );
});

export default AuthButton;
