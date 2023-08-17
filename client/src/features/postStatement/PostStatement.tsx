import { useState } from 'react';
import './styles/postStatement.css';
import './styles/header.css';
import './styles/dialogs.css';
import Guardian from './Guardian';
import Post from './Post';
import * as api from './api';
import Modal from '../modal/Modal';
import Options from '../loadData/Options';


const today = new Date().toISOString().substring(0, 10);

function PostStatement() {
    const [squad, setSquad] = useState(Array(22).fill(''));
    const [id, setId] = useState<number>(0);
    const [date, setDate] = useState<string>(today);
    const [isExist, setIsExist] = useState<boolean>(false);
    const [saving, setSaving] = useState<boolean>(false);

    function setMember(index: number) {
        return function (newValue: string) {
            const list = squad.map((value, i) => i === index ? newValue : value);
            setSquad(list);
        }
    }

    function save() {
        api.save(date, [id, ...squad]);
    }
    
    const leaders = squad.slice(0, 4);
    const guards = squad.slice(4);
    const guardPosts: string[][] = shifted(guards);
    
    return (
        <div className="post-statement">
            <div className="header">
                <div>
                    <label htmlFor='post-statement-id'>
                        N
                    </label>
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
                    onLoad={({id, squad, isExist, date: optionDate}: {id: number, squad: string[], isExist: boolean, date: string}) => {
                        const daysPast = (new Date(date).getTime() - new Date(optionDate).getTime())/(3600*24*1000);
                        setId(id + daysPast*5);
                        setSquad(squad);
                        setIsExist(isExist);
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
            
            <button 
                onClick={() => {
                    if (isExist) {
                        setSaving(true);
                    } else {
                        save();
                    }
                }}
                disabled={squad.findIndex(item => item.match(/\d-$/) || !item) > -1}
                id='ready'
            >
                Готово
            </button>
            {saving ? (
                <Modal>
                    <div className="save-dialog">
                        <p>Ви впевнені, що хочете внести зміни на дату {date}?</p>
                        <div className='buttons'>
                            <button className="yes" onClick={() => {
                                setSaving(false);
                                save();
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

export default PostStatement;