import { TypedUseSelectorHook, useSelector } from "react-redux";
import type { RootState } from "@lib/states/store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
