import { useState, useEffect, useCallback } from "react";

// 防抖函数类型定义
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DebouncedFunction<T extends (...args: any[]) => any> = (...args: Parameters<T>) => void;

/**
 * 定义防抖工具函数
 * @param {Function} callback 计时结束后执行的函数
 * @param {number} delay 防抖时间
 * @returns 防抖函数
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useDebounce = <T extends (...args: any[]) => any>(callback: T, delay: number): DebouncedFunction<T> => {
	const [debouncedCallback, setDebouncedCallback] = useState<DebouncedFunction<T>>(() => {
		// This is an empty function intentionally.
		// It gets replaced by the actual debounced function later.
	});
	// 将回调函数包装为一个函数，防止每次更新时都重新创建一个函数
	const memoizedCallback = useCallback(callback, []);

	useEffect(() => {
		// 创建一个计时器
		const handler = setTimeout(() => {
			// 将回调函数包装为一个函数，防止每次更新时都重新创建一个函数
			setDebouncedCallback(() => (...args: Parameters<T>) => {
				memoizedCallback(...args);
			});
		}, delay);
		// 清除计时器
		return () => {
		clearTimeout(handler);
		};
	}, [memoizedCallback, delay]);
	// 返回防抖函数
	return debouncedCallback;
};

export default useDebounce;
