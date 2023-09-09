// Use throughout your app instead of plain `useDispatch` and `useSelector`
import { AppDispatch, RootState } from '../store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
