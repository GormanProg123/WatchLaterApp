import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Platform } from "../../../api/types/item.types";

interface Props {
  selected: Platform | "all";
  onSelect: (platform: Platform | "all") => void;
  counts: Record<Platform | "all", number>;
}

const FILTERS: {
  key: Platform | "all";
  label: string;
  icon: string;
}[] = [
  { key: "all", label: "All", icon: "grid" },
  { key: Platform.YOUTUBE, label: "YouTube", icon: "play" },
  { key: Platform.MOVIES, label: "Movies", icon: "film" },
  { key: Platform.SERIES, label: "Series", icon: "tv" },
  { key: Platform.OTHER, label: "Other", icon: "globe" },
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

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 2,
    gap: 12,
  },
  cell: {
    width: 110,
    height: 36,
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    paddingHorizontal: 10,
  },
  cellSelected: {
    backgroundColor: "#FF0707",
  },
  label: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: "#616264",
  },
  labelSelected: {
    color: "#fff",
  },
  countBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  countBadgeSelected: {
    backgroundColor: "#F66B6B",
    borderRadius: 11,
  },
  countBadgeAll: {
    marginLeft: 5,
  },
  countText: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#616264",
  },
  countTextSelected: {
    color: "#fff",
  },
});
