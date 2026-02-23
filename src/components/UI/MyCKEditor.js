import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  ClassicEditor,
  Bold,
  Essentials,
  Heading,
  Indent,
  IndentBlock,
  Italic,
  Link,
  List,
  MediaEmbed,
  Paragraph,
  Table,
  Undo
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';

const MyCKEditor = ({
  value = '',
  onChange,
  placeholder = 'Start typing...',
  disabled = false,
  height = '100px'
}) => {
  return (
    <div  style={{
      '--editor-height': height
    }} className="my-ck-editor" >
      <CKEditor
        editor={ClassicEditor}
        disabled={disabled}
        data={value}
        config={{
          licenseKey: 'GPL',
          placeholder,
          toolbar: [
            'undo', 'redo', '|',
            'heading', '|',
            'bold', 'italic', '|',
            'link', 'insertTable', 'mediaEmbed', '|',
            'bulletedList', 'numberedList',
            'indent', 'outdent'
          ],
          plugins: [
            Bold,
            Essentials,
            Heading,
            Indent,
            IndentBlock,
            Italic,
            Link,
            List,
            MediaEmbed,
            Paragraph,
            Table,
            Undo
          ]
        }}
        onChange={(event, editor) => {
          const data = editor.getData()
          onChange && onChange(data)
        }}
      />

    </div>
  )
}

export default MyCKEditor;