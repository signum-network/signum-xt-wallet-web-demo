import { useDispatch } from "react-redux";
import type { AppDispatch } from "@lib/states/store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
