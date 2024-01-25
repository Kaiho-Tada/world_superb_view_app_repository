import { useToast } from "@chakra-ui/react";

type Props = {
  title: string;
  status: "info" | "warning" | "success" | "error";
};

const useMessage = () => {
  const toast = useToast();

  const showMessage = (props: Props) => {
    const { title, status } = props;
    toast({
      title,
      status,
      position: "top",
      duration: 5000,
      isClosable: true,
    });
  };
  return { showMessage };
};
export default useMessage;
