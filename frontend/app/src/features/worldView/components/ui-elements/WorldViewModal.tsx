import {
  Box,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import gipfyLogo from "assets/gipfyLogo.gif";
import tenorLogo from "assets/tenor.png";
import { FC } from "react";

type Props = {
  name: string;
  categoryNameResult: string;
  gifUrl: string;
  gifSite: string | null;
  isOpen: boolean;
  onClose: () => void;
};

const WorldViewModal: FC<Props> = (props) => {
  const { name, categoryNameResult, gifUrl, gifSite, isOpen, onClose } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
      <ModalOverlay />
      <ModalContent role="dialog" aria-label="絶景モーダル">
        <ModalBody p={0}>
          <Box position="relative" h="290">
            <ModalCloseButton />
            <Image src={gifUrl} alt="絶景gif" h="100%" w="100%" />
            <Box position="absolute" bottom="0" left="0" textAlign="left" pl="3" pb="2">
              <Text fontSize="md" fontWeight="bold">
                {name}
              </Text>
              <Text fontSize="sm">{categoryNameResult}</Text>
            </Box>
            {gifSite === "tenor" ? (
              <a href="https://tenor.com/ja/" target="_blank" rel="noopener noreferrer">
                <Box bg="black" position="absolute" bottom="0" right="0" padding={2}>
                  <Image h="4" src={tenorLogo} alt="tenorのロゴ" />
                </Box>
              </a>
            ) : (
              gifSite === "giphy" && (
                <a href="https://giphy.com/" target="_blank" rel="noopener noreferrer">
                  <Image
                    src={gipfyLogo}
                    h="8"
                    position="absolute"
                    bottom="0"
                    right="0"
                    alt="giphyのロゴ"
                  />
                </a>
              )
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default WorldViewModal;
