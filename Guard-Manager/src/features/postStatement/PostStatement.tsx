import { useState } from 'react';
import './styles/postStatement.css';
import './styles/header.css';
import './styles/dialogs.css';
import Guardian from './Guardian';
import Post from './Post';
import api from './api';
import Modal from '../modal/Modal';
import Options from '../options/Options';


const mode = process.env.REACT_APP_MODE;

const today = new Date().toISOString().substring(0, 10);

function PostStatement() {
    const sendMessage: (event: string, args: any) => Promise<string[]> = (window as any).electron.ipcRenderer.invoke;
    const [squad, setSquad] = useState(Array(22).fill(''));
    const [id, setId] = useState<number>(0);
    const [date, setDate] = useState<string>(today);
    const [saving, setSaving] = useState<boolean>(false);
    const [saved, setSaved] = useState<string>('');
    const [choosingTemplate, setChoosingTemplate] = useState<boolean>(false);

    function setMember(index: number) {
        return function (newValue: string) {
            const list = squad.map((value, i) => i === index ? newValue : value);
            setSquad(list);
        }
    }
    
    const leaders = squad.slice(0, 4);
    const guards = squad.slice(4);
    const guardPosts: string[][] = shifted(guards);
    
    return (
        <div className='post-statement'>
            <div className="header">
                <div>
                    <label htmlFor='post-statement-id'>N</label>
                    <button onClick={() => setId(id - 10)}>-10</button>
                        <input
                            type="text"
                            id='post-statement-id'
                            className='post-statement-id'
                            value={id} 
                            onChange={e => setId(+e.target.value.replace(/\D/g, ''))}
                        />
                    <button onClick={() => setId(id + 10)}>+10</button>
                </div>
                <div className="date">
                    <label htmlFor="date">Дата</label>
                    <input
                        type="date"
                        name="date"
                        id="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                    />
                </div>

                <Options 
                    onLoad={({id, squad, date: optionDate}: {id: number, squad: string[], date: string}) => {
                        const daysPast = (new Date(date).getTime() - new Date(optionDate).getTime())/(3600*24*1000);
                        setId(id + daysPast*5);
                        setSquad(squad);
                        setSaved(date+id+JSON.stringify(squad));
                    }}
                    onShift={() => {
                        const updated = shiftDown(guardPosts).flat();
                        setSquad([...leaders, ...updated]);
                        setSaved('');
                    }}
                    onClear={() => {
                        setId(0);
                        setSquad(Array(22).fill(''));
                        setDate(new Date().toISOString().substring(0, 10))
                    }}

                />
            </div>
            <ul className="leaders">
                {leaders.map((guardian, index) => (
                    <Guardian
                        key={index}
                        guardian={guardian}
                        onChange={setMember(index)}
                        position={definePosition(index)}
                    />
                ))}
            </ul>
            <ul className="squad">
                {guardPosts.map((post, postNumber) => (
                    <Post
                        key={postNumber}
                        postNumber={postNumber}
                        guardians={post}
                        onChange={setMember}
                    />
                ))}
            </ul>
            
            {!saved || saved !== date+id+JSON.stringify(squad) ? (
                <button 
                    onClick={() => {
                        setSaving(true);
                    }}
                    disabled={
                        saved === date+id+JSON.stringify(squad) || 
                        squad.findIndex(item => item.match(/\d-$/) || !item) > -1
                    }
                    id='save'
                >
                    Зберегти
                </button>
            ) : (
                <button 
                    onClick={() => api.getReport(date)}
                    id='generate'
                >
                    Згенерувати відомість
                </button>
            )}
            {saving ? (
                <Modal>
                    <div className="save-dialog">
                        <p>Ви впевнені, що хочете зберегти зміни на {date}?</p>
                        <div className='buttons'>
                            <button className="yes" onClick={() => {
                                setSaving(false);
                                api.save(date, [id, ...squad]);
                                setSaved(date+id+JSON.stringify(squad));
                            }}>Так</button>
                            <button className="no" onClick={() => setSaving(false)}>Ні</button>
                        </div>
                    </div>
                </Modal>
            ) : null}
        </div>
    )
}

function definePosition(index: number) {
    switch (index) {
        case 0:
            return 'НВ';
        case 1:
            return 'ПНВ';
        case 2:
            return 'РВ1';
        case 3:
            return 'РВ2';
        default:
            return String(index);
    }
}

function shifted(arr: string[]): string[][] {
    const guardPosts: string[][] = [];
    let i, j = 0, k = 0;
    for (i = 0; i < arr.length; i++) {
        if (!guardPosts[j]) 
            guardPosts[j] = [];
        guardPosts[j][k] = arr[i];

        if (k < 2) {
            k++;
        } else {
            j++;
            k = 0;
        }
    }
    return guardPosts;
}


function shiftDown(arr: string[][]): string[][] {
    return arr.map(items => {
        const last = items.at(-1) as string;
        const rest = items.slice(0, -1);
        return [last, ...rest];
    });
}

export default PostStatement;