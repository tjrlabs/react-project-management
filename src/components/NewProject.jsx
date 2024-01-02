import Input from "./Input.jsx";
import {useRef} from "react";
import Modal from "./Modal.jsx";

export default function NewProject({onProjectAdd,onCancelProject}){
    const modal = useRef();

    const titleRef = useRef();
    const descriptionRef = useRef();
    const dueDateRef = useRef();

    function handleSave(){
        const title = titleRef.current.value;
        const description = descriptionRef.current.value;
        const dueDate = dueDateRef.current.value;

        if(title.trim() === '' || description.trim() === '' || dueDate.trim() === ''){
            modal.current.open();
            return;
        }
        onProjectAdd({
            title,
            description,
            dueDate
        });
    }

    function handleCancel(){
        onCancelProject();
    }

    return <>
        <Modal ref={modal}>
            <h2 className={`text-xl font-bold text-stone-500 my-4`}>Invalid Input</h2>
            <p className={`text-stone-400 mb-4`}>Oops.. you forgot to enter a value</p>
        </Modal>
        <div className={`w-[35rem] mt-16`}>
            <menu className={`flex items-center justify-end gap-4 my-4`}>
                <li><button onClick={handleCancel} className={`text-stone-800 hover:text-stone-950`}>Cancel</button></li>
                <li><button onClick={handleSave} className={`bg-stone-800 text-stone-50 hover:bg-stone-950 px-6 py-2 rounded-md`}>Save</button></li>
            </menu>
            <div>
                <Input type="text" label="Title" ref={titleRef}/>
                <Input isTextArea label="Description" ref={descriptionRef} />
                <Input type="date" label="Due Date" ref={dueDateRef}/>
            </div>
        </div>
    </>
}