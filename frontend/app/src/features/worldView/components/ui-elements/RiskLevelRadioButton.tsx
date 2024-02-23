import { Flex, Image, VStack } from "@chakra-ui/react";
import starIcon from "assets/riskLevelStar.png";
import zeroStarIcon from "assets/zoroRiskLevelStar.png";
import { useWorldViewListContext } from "providers/WorldViewListProvider";
import { ChangeEvent, FC } from "react";
import { v4 as uuidv4 } from "uuid";

const RiskLevelRadioButton: FC = () => {
  const { state, dispatch } = useWorldViewListContext();
  const { riskLevel, loadingSearchWorldViews } = state;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_RISK_LEVEL", payload: e.target.value });
  };
  const riskLevels = [
    { value: "4", label: "リスクレベル4", stars: 4 },
    { value: "3", label: "リスクレベル3", stars: 3 },
    { value: "2", label: "リスクレベル2", stars: 2 },
    { value: "1", label: "リスクレベル1", stars: 1 },
    { value: "0", label: "リスクレベル0", stars: 0 },
  ];

  return (
    <VStack align="left">
      {riskLevels.map((level) => (
        <label key={level.value} htmlFor={`riskLevel${level.value}`}>
          <Flex align="center">
            <input
              id={`riskLevel${level.value}`}
              type="radio"
              aria-label={`${level.label}のラジオボタン`}
              value={level.value}
              checked={riskLevel === level.value}
              onChange={handleChange}
              disabled={loadingSearchWorldViews}
              style={{
                marginRight: "12px",
                width: "16px",
                height: "16px",
                accentColor: "teal",
              }}
            />
            {level.stars !== 0 ? (
              [...Array(level.stars)].map(() => (
                <Image
                  key={uuidv4()}
                  boxSize="14px"
                  src={starIcon}
                  mr="2"
                  alt={`${level.label}アイコン`}
                />
              ))
            ) : (
              <Image boxSize="14px" src={zeroStarIcon} mr="2" alt="リスクレベルアイコン(0)" />
            )}
          </Flex>
        </label>
      ))}
    </VStack>
  );
};

export default RiskLevelRadioButton;
