export const AVATAR_COLORS = [
  "#E74C3C",
  "#8E44AD",
  "#2980B9",
  "#27AE60",
  "#F39C12",
  "#16A085",
  "#D35400",
  "#C0392B",
] as const;

export const PLATFORM_CONFIG = {
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
