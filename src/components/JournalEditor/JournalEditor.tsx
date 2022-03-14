import React from 'react';
import './JournalEditor.css';

import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';

import JournalToolbar from './JournalToolbar/JournalToolbar';
import EditorHandler from './EditorHandler/EditorHandler';
import Loading from '../Loading/Loading';

function JournalEditor({titleRef, tagRef, draft} : {titleRef : any, tagRef : any, draft? : any}) {
    let { editor, onReady } : any = useFabricJSEditor();
    let [isLoading, setIsLoading] = React.useState(false);
    const ref : any = React.useRef(null);

    // Handle resize of the canvas (keep the same aspect ratio but zoom in)
    function resizeCanvas() {
        if (!editor || !ref.current || !ref.current.clientWidth) return;
        const ratio = editor.canvas.getWidth() / editor.canvas.getHeight();
        const containerWidth = ref.current.clientWidth;
        const scale = containerWidth / editor.canvas.getWidth();
        const zoom  = editor.canvas.getZoom() * scale;
    
        editor.canvas.setDimensions({width: containerWidth, height: containerWidth / ratio});
        editor.canvas.setViewportTransform([zoom, 0, 0, zoom, 0, 0]);
    }
    
    let editorHandler : any = undefined;

    function saveTitle(e:any) {
        editorHandler.setTitle(e.target.value);
    }

    React.useEffect(() => {
        let ref = titleRef.current;
        ref.addEventListener('keyup', saveTitle)
    
        // will run on cleanup
        return () => {
            ref.removeEventListener('keyup', saveTitle)
        }
    })

    if (editor) {
        editorHandler = new EditorHandler(editor);

        //inputRef.current.removeEventListener('keyup', saveTitle);
        //inputRef.current.addEventListener('keyup', saveTitle);
        
        if (draft) {
            editorHandler.loadDraft(draft);
        } else {
            editor.canvas.setDimensions({width: 500, height: 1000});
        }
        resizeCanvas();
    }

    React.useEffect(() => {
        window.addEventListener('resize', resizeCanvas)
    
        // will run on cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas)
        }
    })
    

    return (
        <div ref={ref} className="journalEditor">
            {isLoading && (<Loading />)}
            <JournalToolbar isLoading={isLoading} setIsLoading={setIsLoading} editorHandler={editorHandler} />
            <FabricJSCanvas className="journalCanvas" onReady={onReady} />
        </div>
    );
}

export default JournalEditor;
