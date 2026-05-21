export interface ItemAddingFormProps {
  visible: boolean;
  onClose: () => void;
}

export const CATEGORIES = [
  { key: "youtube", label: "YouTube", icon: "play" },
  { key: "movies", label: "Movies", icon: "film" },
  { key: "series", label: "Series", icon: "tv" },
  { key: "other", label: "Others", icon: "globe" },
] as const;
