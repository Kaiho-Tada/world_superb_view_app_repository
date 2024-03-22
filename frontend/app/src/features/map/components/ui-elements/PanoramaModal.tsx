import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { useMapContext } from "providers/MapProvider";
import { FC } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const PanoramaModal: FC<Props> = ({ isOpen, onClose }) => {
  const { state } = useMapContext();
  const { clickedWorldView } = state;
  const mapsEmbedApiKey = process.env.REACT_APP_MAPS_EMBED_API_KEY;

  return (
    clickedWorldView && (
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalBody p={0}>
            <iframe
              title="ストリートビュー"
              width="100%"
              height="350px"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              src={`https://www.google.com/maps/embed/v1/streetview?key=${mapsEmbedApiKey}
                &location=${clickedWorldView.latitude},${clickedWorldView.longitude}&fov=80`}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    )
  );
};

export default PanoramaModal;
