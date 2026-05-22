import { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { ItemService } from "../../../api/services/item.service";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { itemAddingStyles as styles } from "./itemAddingStyles";
import {
  ItemAddingFormProps,
  CATEGORIES,
} from "../../constants/itemAdding.constants";

export const ItemAddingForm = ({ visible, onClose }: ItemAddingFormProps) => {
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [remindAt, setRemindAt] = useState<Date | null>(null);

  const handleClose = () => {
    setLink("");
    setTitle("");
    setCategory(null);
    setRemindAt(null);
    onClose();
  };

  const openDatePicker = () => {
    DateTimePickerAndroid.open({
      value: remindAt || new Date(),
      mode: "date",
      is24Hour: true,
      onValueChange: (event, date) => {
        if (date) {
          setRemindAt(date);
        }
      },
    });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity style={styles.closeBtn} onPress={handleClose}>
          <Feather name="x" size={28} color="#D9D9D9" />
        </TouchableOpacity>

        <Text style={styles.title}>Add to Watchlist</Text>
        <Text style={styles.subtitle}>Save a link to watch later</Text>

        <View style={styles.fieldWrap}>
          <Text style={styles.label}>Link</Text>
          <View style={styles.inputRow}>
            <Feather name="link" size={14} color="#616264" />
            <TextInput
              style={styles.input}
              placeholder="Paste URL here..."
              placeholderTextColor="#616264"
              value={link}
              onChangeText={setLink}
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={[styles.fieldWrap, { marginTop: 11 }]}>
          <Text style={styles.label}>Title</Text>
          <View style={styles.inputRow}>
            <Feather name="type" size={14} color="#616264" />
            <TextInput
              style={styles.input}
              placeholder="What are you saving?"
              placeholderTextColor="#616264"
              value={title}
              onChangeText={setTitle}
            />
          </View>
        </View>

        <View style={[styles.fieldWrap, { marginTop: 11 }]}>
          <Text style={styles.label}>Watch before</Text>

          <TouchableOpacity style={styles.inputRow} onPress={openDatePicker}>
            <Feather name="clock" size={14} color="#616264" />
            <Text
              style={{ color: remindAt ? "#D9D9D9" : "#616264", fontSize: 13 }}
            >
              {remindAt ? remindAt.toLocaleString() : "Select date & time"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.fieldWrap, { marginTop: 14 }]}>
          <Text style={styles.label}>Category</Text>
          <View style={styles.categoryRow}>
            {CATEGORIES.map((cat) => {
              const selected = category === cat.key;
              return (
                <TouchableOpacity
                  key={cat.key}
                  style={[
                    styles.categoryBtn,
                    selected && styles.categoryBtnSelected,
                  ]}
                  onPress={() => setCategory(cat.key)}
                >
                  <Feather
                    name={cat.icon as any}
                    size={12}
                    color={selected ? "#FF0000" : "#616264"}
                  />
                  <Text
                    style={[
                      styles.categoryText,
                      selected && styles.categoryTextSelected,
                    ]}
                  >
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <TouchableOpacity
          style={styles.submitBtn}
          onPress={async () => {
            if (!link) return;
            try {
              await ItemService.create({
                url: link,
                title: title || undefined,
                platform: (category as any) ?? "other",
                remindAt: remindAt ? remindAt.toISOString() : undefined,
              });
              setLink("");
              setTitle("");
              setCategory(null);
              setRemindAt(null);
              onClose();
            } catch (e) {
              console.error("Failed to create item", e);
            }
          }}
        >
          <Text style={styles.submitText}>+ Add to Watchlist</Text>
        </TouchableOpacity>
      </ScrollView>
    </Modal>
  );
};
