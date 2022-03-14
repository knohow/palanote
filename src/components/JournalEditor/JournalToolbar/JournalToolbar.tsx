import React from 'react';
import '../JournalEditor.css';

import { Brush, Highlight, TextFields, HighlightAlt, Backspace, Add, Visibility, VisibilityOff } from '@mui/icons-material';
import EditorHandler from '../EditorHandler/EditorHandler';
import Dropdown from './Dropdown/Dropdown';
import HandwritingTool from './HandwritingTool/HandwritingTool';

const divider = {type: 'divider', props: {title: '', tool: '', icon: null, onClick: () => {}}};
const growableDivider = {type: 'growableDivider', props: {title: '', tool: '', icon: null, onClick: () => {}}};

const tools = [
    {
        type: 'button',
        props: {
            title: 'Select Tool',
            tool: 'select',
            icon: <HighlightAlt />,
            onClick: (editor: EditorHandler, setActiveTool : any, isLoading:boolean, setIsLoading:any) => {
                setActiveTool();
                editor.setTool('select');
            }
        }
    },
    divider,
    {
        type: 'HandwritingTool',
        props: {
            title: 'Pen Tool',
            tool: 'pen',
            icon: <Brush />,
            onClick: (editor: EditorHandler, setActiveTool : any, isLoading:boolean, setIsLoading:any) => {
                setActiveTool();
                editor.setTool('pen');
            }
        }
    },
    {
        type: 'HandwritingTool',
        props: {
            title: 'Highlight Tool',
            tool: 'highlighter',
            icon: <Highlight />,
            onClick: (editor: EditorHandler, setActiveTool : any, isLoading:boolean, setIsLoading:any) => {
                setActiveTool();
                editor.setTool('highlighter');
            }
        }
    },
    {
        type: 'HandwritingTool',
        props: {
            title: 'Eraser Tool',
            tool: 'eraser',
            icon: <Backspace />,
            onClick: (editor: EditorHandler, setActiveTool : any, isLoading:boolean, setIsLoading:any) => {
                setActiveTool();
                editor.setTool('eraser');
            }
        }
    },
    divider,
    {
        type: 'button',
        props: {
            title: 'Add Text',
            tool: 'text',
            icon: <TextFields />,
            onClick: (editor: EditorHandler, setActiveTool : any, isLoading:boolean, setIsLoading:any) => {
                setActiveTool();
                editor.setTool('text');
            }
        }
    },
    growableDivider,
    {
        type: 'dropdown',
        props: {
            title: 'Set visibility',
            tool: 'divider',
            items: [
                {
                    title: 'Public',
                    description: 'Everyone can see this journal',
                    icon: <Visibility />,
                    key: 'public',
                },
                {
                    title: 'Unlisted',
                    description: 'Only those with the link can view this journal',
                    icon: <Visibility />,
                    key: 'unlisted',
                },
                {
                    title: 'Private',
                    description: 'Only you can see this journal',
                    icon: <VisibilityOff />,
                    key: 'private',
                }
            ],
            icon: <Visibility />,
            onClick: (editor: EditorHandler, selectedKey: any, isLoading:boolean, setIsLoading:any) => {
                editor.setVisibility(selectedKey);
            }
        }
    },
    {
        type: 'postButton',
        props: {
            title: 'Post',
            tool: 'post',
            icon: <Add />,
            onClick: async (editor: EditorHandler, setActiveTool : any, isLoading:boolean, setIsLoading:any) => {
                setIsLoading(true);
                let resp = await editor.postJournal();

                if (resp.success) {
                    window.location.pathname = `/journal/${resp.journalID}`;
                }
            }
        }
    }
]


function JournalToolbar({editorHandler, isLoading, setIsLoading} : {editorHandler : EditorHandler | undefined, isLoading : boolean, setIsLoading : any}) {
    const [activeTool, setActiveTool] : [number, any] = React.useState(0);

    if (editorHandler) {
        return (
            <div className="journalToolbar">
                {tools.map((tool, index) => {
                    switch(tool.type) {
                        case 'divider':
                            return <div key={`divider-${index}`} className="divider" />;
                        case 'growableDivider':
                            return <div key={`divider-${index}`} className="growableDivider" />
                        case 'button':
                            return (
                                <div
                                    key={tool.props.tool}
                                    title={tool.props.title}
                                    className={"toolbarBtn" + (activeTool === index ? " active" : "")}
                                    onClick={(e) => {
                                        (e.target as HTMLElement).blur();
                                        tool.props.onClick(editorHandler, () => {setActiveTool(index)}, isLoading, setIsLoading)
                                    }}>
                                    {tool.props.icon}
                                </div>
                            );
                        case 'postButton':
                            return (
                                <div
                                    key={tool.props.tool}
                                    title={tool.props.title}
                                    className="toolbarBtn postBtn"
                                    onClick={() => {
                                        tool.props.onClick(editorHandler, () => {setActiveTool(index)}, isLoading, setIsLoading)
                                    }}>
                                    {tool.props.icon}
                                    <span>{tool.props.title}</span>
                                </div>
                            );
                        case 'HandwritingTool':
                            return (
                                <HandwritingTool
                                    key={tool.props.tool}
                                    isSelected={activeTool === index}
                                    editorHandler={editorHandler}
                                    {...tool.props}
                                    onClick={(e : any) => {
                                        (e.target as HTMLElement).blur();
                                        tool.props.onClick(editorHandler, () => {setActiveTool(index)}, isLoading, setIsLoading)
                                    }}
                                />
                            );
                        case 'dropdown':
                            return (
                                <Dropdown 
                                    key={tool.props.tool}
                                    editorHandler={editorHandler}
                                    {...tool.props}
                                />
                            )
                    }
                })}
            </div>
        );
    }
    return (<div className="journalToolbar"></div>)
}

export default JournalToolbar;
