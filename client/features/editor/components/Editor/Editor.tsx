import { useEffect, memo, useRef } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import { Box } from '@mui/material';

import { EDITOR_TOOLS } from '@/features/editor';

interface EditorProps {
  data?: OutputData;
  onChange(val: OutputData): void;
  holder: string;
}

export const Editor = memo(({ data, onChange, holder }: EditorProps) => {
  //add a reference to editor
  const ref = useRef<EditorJS>();

  //initialize editorjs
  useEffect(() => {
    //initialize editor if we don't have a reference
    if (!ref.current) {
      const editor = new EditorJS({
        inlineToolbar: true,
        holder: holder,
        tools: EDITOR_TOOLS,
        minHeight: 0,
        data,
        async onChange(api, event) {
          const data = await api.saver.save();
          onChange(data);
        },
      });
      ref.current = editor;
    }

    //add a return function handle cleanup
    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, []);

  return <Box id={holder} />;
});
