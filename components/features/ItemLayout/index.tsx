import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { ItemService } from "../../../api/servises/item.service";
import { ItemStatus } from "../../../api/types/item.types";

const { width } = Dimensions.get("window");

interface Props {
  id: string;
  title: string;
  description?: string;
  platform: "youtube" | "movies" | "series" | "other";
  url: string;
  createdAt: string;
  status: ItemStatus;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: ItemStatus) => void;
}

const PLATFORM_CONFIG = {
  youtube: {
    label: "YouTube",
    icon: "play",
    bg: "#3E171C",
    color: "#FF0000",
  },
  movies: {
    label: "Movies",
    icon: "film",
    bg: "#3F2D12",
    color: "#FFB900",
  },
  series: {
    label: "Series",
    icon: "tv",
    bg: "#152846",
    color: "#50A0F9",
  },
  other: {
    label: "Others",
    icon: "globe",
    bg: "#154622",
    color: "#50F956",
  },
} as const;

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleString("en-US", { month: "short", day: "numeric" });
};

export const ItemLayout = ({
  id,
  title,
  description,
  platform,
  url,
  createdAt,
  status,
  onDelete,
  onStatusChange,
}: Props) => {
  const watched = status === ItemStatus.DONE;
  const cfg = PLATFORM_CONFIG[platform] ?? PLATFORM_CONFIG.other;

  const handleToggleWatched = async () => {
    const newStatus = watched ? ItemStatus.WANT : ItemStatus.DONE;
    try {
      await ItemService.updateStatus(id, newStatus);
      onStatusChange(id, newStatus);
    } catch (e) {
      console.error("Failed to update status", e);
    }
  };

  return (
    <View style={[styles.container, watched && styles.containerWatched]}>
      <View style={styles.thumbnail} />
      <View style={[styles.info, watched && styles.infoWatched]}>
        <Text
          style={[styles.title, watched && styles.titleWatched]}
          numberOfLines={1}
        >
          {title}
        </Text>

        {description ? (
          <Text
            style={[styles.description, watched && styles.descriptionWatched]}
            numberOfLines={1}
          >
            {description}
          </Text>
        ) : null}

        <View style={styles.metaRow}>
          <View style={[styles.platformBadge, { backgroundColor: cfg.bg }]}>
            <Feather name={cfg.icon as any} size={12} color={cfg.color} />
            <Text style={[styles.platformText, { color: cfg.color }]}>
              {cfg.label}
            </Text>
          </View>
          <View style={styles.dateWrap}>
            <Feather name="clock" size={10} color="#616264" />
            <Text style={styles.dateText}>{formatDate(createdAt)}</Text>
          </View>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.watchedBtn}
            onPress={handleToggleWatched}
          >
            <Feather
              name="check"
              size={12}
              color={watched ? "#FF0000" : "#fff"}
            />
            <Text
              style={[styles.watchedText, watched && styles.watchedTextDone]}
            >
              {watched ? "Watched" : "Mark Done"}
            </Text>
          </TouchableOpacity>

          <View style={styles.rightActions}>
            <TouchableOpacity onPress={() => Linking.openURL(url)}>
              <Feather name="external-link" size={16} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete(id)}>
              <Feather name="trash-2" size={16} color="#FF0000" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width - 40,
    height: 130,
    backgroundColor: "#0F1216",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 12,
  },
  containerWatched: {
    opacity: 0.5,
  },
  thumbnail: {
    width: 130,
    height: 75,
    backgroundColor: "#1E1E1E",
    borderRadius: 6,
  },
  info: {
    flex: 1,
    gap: 4,
  },
  infoWatched: {
    opacity: 0.7,
  },
  title: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#FFFFFF",
  },
  titleWatched: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  description: {
    fontFamily: "Inter_400Regular",
    fontSize: 10,
    color: "#888",
  },
  descriptionWatched: {
    textDecorationLine: "line-through",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  platformBadge: {
    width: 68,
    height: 21,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  platformText: {
    fontFamily: "Inter_400Regular",
    fontSize: 10,
  },
  dateWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  dateText: {
    fontFamily: "Inter_400Regular",
    fontSize: 10,
    color: "#616264",
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 2,
  },
  watchedBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  watchedText: {
    fontFamily: "Inter_400Regular",
    fontSize: 8,
    color: "#fff",
  },
  watchedTextDone: {
    color: "#FF0000",
  },
  rightActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
