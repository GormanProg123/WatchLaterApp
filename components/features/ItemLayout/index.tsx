import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  Image,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { ItemService } from "../../../api/servises/item.service";
import { ItemStatus } from "../../../api/types/item.types";
import { useRef } from "react";
import { itemLayoutStyles as styles } from "./itemLayoutStyles";

interface Props {
  id: string;
  title: string;
  description?: string;
  platform: "youtube" | "movies" | "series" | "other";
  url: string;
  thumbnailUrl?: string;
  remindAt?: string;
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
  thumbnailUrl,
  url,
  remindAt,
  status,
  onStatusChange,
}: Props) => {
  const isDeletingRef = useRef(false);
  const cfg = PLATFORM_CONFIG[platform] ?? PLATFORM_CONFIG.other;

  const handleMarkDone = () => {
    if (isDeletingRef.current) return;

    Alert.alert("Mark as watched?", "You can restore it within 7 days.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes, watched it",
        onPress: async () => {
          if (isDeletingRef.current) return;
          isDeletingRef.current = true;
          try {
            await ItemService.updateStatus(id, ItemStatus.DONE);
            onStatusChange(id, ItemStatus.DONE);
          } catch (e) {
            console.error(e);
            isDeletingRef.current = false;
          }
        },
      },
    ]);
  };

  const handleRestore = () => {
    onStatusChange(id, ItemStatus.WANT);
  };

  return (
    <View style={[styles.container, status === "done" && styles.doneContainer]}>
      <View style={styles.leftCol}>
        <View
          style={[
            styles.platformBadge,
            { backgroundColor: cfg.bg, borderColor: cfg.color },
          ]}
        >
          <Feather name={cfg.icon as any} size={10} color={cfg.color} />
          <Text style={[styles.platformText, { color: cfg.color }]}>
            {cfg.label}
          </Text>
        </View>

        {thumbnailUrl ? (
          <Image
            source={{ uri: thumbnailUrl }}
            style={styles.thumbnail}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.thumbnailPlaceholder}>
            <Feather name={cfg.icon as any} size={20} color="#333" />
          </View>
        )}
      </View>

      <View style={styles.info}>
        <Text
          style={[styles.title, status === "done" && styles.doneTitle]}
          numberOfLines={2}
        >
          {title}
        </Text>

        {description ? (
          <Text style={styles.description} numberOfLines={1}>
            {description}
          </Text>
        ) : null}

        <View style={styles.dateWrap}>
          <Feather name="clock" size={10} color="#616264" />
          <Text style={styles.dateText}>
            {remindAt ? `Watch before ${formatDate(remindAt)}` : "No deadline"}
          </Text>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity onPress={() => Linking.openURL(url)}>
            <Feather name="external-link" size={15} color="#fff" />
          </TouchableOpacity>

          {status === ItemStatus.DONE ? (
            <TouchableOpacity style={styles.restoreBtn} onPress={handleRestore}>
              <Feather name="rotate-ccw" size={12} color="#fff" />
              <Text style={styles.restoreText}>Restore</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.markDoneBtn}
              onPress={handleMarkDone}
            >
              <Feather name="check" size={12} color="#fff" />
              <Text style={styles.markDoneText}>Mark Done</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};
