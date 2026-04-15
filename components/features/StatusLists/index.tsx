import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Platform } from "../../../api/types/item.types";
import { statusListStyles as styles } from "./statusListStyles";

interface Props {
  selected: Platform | "all" | "watched";
  onSelect: (platform: Platform | "all" | "watched") => void;
  counts: Record<Platform | "all" | "watched", number>;
}

const FILTERS: {
  key: Platform | "all" | "watched";
  label: string;
  icon: string;
}[] = [
  { key: "all", label: "All", icon: "grid" },
  { key: Platform.YOUTUBE, label: "YouTube", icon: "play" },
  { key: Platform.MOVIES, label: "Movies", icon: "film" },
  { key: Platform.SERIES, label: "Series", icon: "tv" },
  { key: Platform.OTHER, label: "Other", icon: "globe" },
  { key: "watched", label: "Watched", icon: "check-circle" },
];

export const StatusList = ({ selected, onSelect, counts }: Props) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {FILTERS.map((filter) => {
        const isSelected = selected === filter.key;
        const count = counts[filter.key] ?? 0;

        return (
          <TouchableOpacity
            key={filter.key}
            style={[styles.cell, isSelected && styles.cellSelected]}
            onPress={() => onSelect(filter.key)}
          >
            <Feather
              name={filter.icon as any}
              size={14}
              color={isSelected ? "#fff" : "#616264"}
            />
            <Text style={[styles.label, isSelected && styles.labelSelected]}>
              {filter.label}
            </Text>
            <View
              style={[
                styles.countBadge,
                isSelected && styles.countBadgeSelected,
                filter.key === "all" && styles.countBadgeAll,
              ]}
            >
              <Text
                style={[
                  styles.countText,
                  isSelected && styles.countTextSelected,
                ]}
              >
                {count}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};
