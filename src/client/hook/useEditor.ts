import { useState, useEffect } from "react";
/**
 * Listener for input of type Q
 */
export type EditorListener<Q> = (value: Q) => void;
/**
 * Creates a listener by a given type Q and key name
 */
export type EditorFactory = <Q>(
  obj: object,
  name: string
) => {
  name: string;
  value: Q;
  onChange: EditorListener<Q>;
};
/**
 * A hook for synchronizing inputs with nested objects
 * @param defaultValue
 * @param parentEditorListener [optional] A listener to pass data to a parent editor
 * @returns the current value of the editor and a factory to create listeners
 */
export function useEditor<T extends Object | null>(
  defaultValue: T,
  parentEditorListener?: EditorListener<T>
): [T, EditorFactory, (value: T) => void] {
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    parentEditorListener?.(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const editorFactory: EditorFactory = <Q>(obj: any, key: string) => ({
    name: key,
    value: obj[key],
    onChange: (value: Q) => {
      setValue((prev: T) => {
        let newValue = { ...prev, [key]: value };
        return newValue;
      });
    },
  });
  return [value, editorFactory, setValue];
}

/**
 * Creates a listener by a given type Q and key id for arrays
 */
export type ArrayEditorFactory<Q> = (
  obj: object,
  id: number
) => {
  name: number;
  value: Q;
  onChange: EditorListener<Q>;
};

export function useArrayEditor<T>(
  defaultValue: T[],
  createElem: (props?: any) => T,
  parentEditorListener?: EditorListener<T[]>
): [
  T[],
  (value: T[]) => void,
  ArrayEditorFactory<T>,
  (props?: any) => void,
  (index: number) => () => void
] {
  const [value, setValue] = useState<T[]>(defaultValue);

  useEffect(() => {
    parentEditorListener?.(value);
  }, [value]);

  const editorFactory: ArrayEditorFactory<T> = (obj: any, id: number) => ({
    name: id,
    value: obj[id],
    onChange: (value: T) => {
      setValue((prev: T[]) => {
        let newValue: T[] = [...prev];
        newValue[id] = value;
        return newValue;
      });
    },
  });

  const addNew = (props?: any) => {
    setValue((prev: T[]) => {
      let newValue: T[] = [...prev];
      newValue.push(createElem(props));
      return newValue;
    });
  };
  const deleterFactory = (index: number) => () => {
    setValue((prev: T[]) => {
      console.log("deleting", index);
      let newValue: T[] = [...prev];
      newValue.splice(index, 1);
      return newValue;
    });
  };

  return [value, setValue, editorFactory, addNew, deleterFactory];
}
