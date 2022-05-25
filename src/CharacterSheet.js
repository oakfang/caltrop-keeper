import {
  Button,
  Card,
  Col,
  Container,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import { useParams, useNavigate } from "react-router-dom";
import { AttributesChart } from "./AttributesChart";
import { StatMeter } from "./StatMeter";
import { FeatureList } from "./FeatureList";
import { Confirmation, useConfirmation } from "./Confirmation";
import { heritages, trainings } from "./db";
import { useAppState } from "./state";

export function CharacterSheet() {
  const { characterId } = useParams();
  const navigate = useNavigate();
  const { getCharacter, updateCharacter, removeCharacter } = useAppState();
  const character = getCharacter(characterId);
  const heritage = heritages[character.heritage];
  const training = trainings[character.training];
  const [removeModalProps, doRemoveCharacter] = useConfirmation(() => {
    navigate("..");
    removeCharacter(characterId);
  });

  return (
    <Container>
      <Spacer y={1} />
      <Row gap={1} wrap="wrap">
        <Col span="2">
          <Card bordered>
            <Text h1>{character.name}</Text>
            <Text h3>Heritage: {heritage.title}</Text>
            <Text h4 color="var(--nextui-colors-accents5)">
              {heritage.description}
            </Text>
            <Text h3>Training: {training.title}</Text>
            <Text h4 color="var(--nextui-colors-accents5)">
              {training.description}
            </Text>
          </Card>
          <Spacer y={1} />
          <Card bordered>
            <Text h2>Controls</Text>
            <Spacer y={0.5} />
            <Button bordered color="error" onClick={doRemoveCharacter}>
              Delete "{character.name}"
            </Button>
            <Confirmation {...removeModalProps} />
          </Card>
        </Col>
        <Col span="5">
          <Card bordered>
            <Text h2>Stats</Text>
            <AttributesChart {...character} />
            <StatMeter
              label="Health"
              character={character}
              attribute="health"
              updateCharacter={updateCharacter}
            />
            <StatMeter
              label="Power"
              character={character}
              attribute="power"
              updateCharacter={updateCharacter}
            />
          </Card>
        </Col>
        <Col span="5">
          <Card bordered>
            <Text h2>Features</Text>
            <Spacer y={1} />
            <FeatureList
              features={character.features}
              character={character}
              updateCharacter={updateCharacter}
            />
          </Card>
        </Col>
      </Row>
    </Container>
  );
}