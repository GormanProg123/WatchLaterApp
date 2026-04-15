import { Text, TouchableOpacity } from "react-native";
import { buttonItemStyles as styles } from "./buttonItemStyles";

interface Props {
  onPress: () => void;
}

export const AddButtonItem = ({ onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.plus}>+</Text>
    </TouchableOpacity>
  );
};
