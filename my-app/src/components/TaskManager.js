import React, { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  query, 
  onSnapshot, 
  updateDoc, 
  doc, 
  deleteDoc 
} from 'firebase/firestore';
import { auth, db } from '../firebase';
import { generateTaskInsight } from '../openai';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [taskInsight, setTaskInsight] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) {
      navigate('/');
      return;
    }

    const q = query(
      collection(db, 'users', auth.currentUser.uid, 'tasks')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasksData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(tasksData);
    });

    return () => unsubscribe();
  }, [navigate]);

  const addTask = async () => {
    if (!newTask.trim()) return;

    try {
      const insight = await generateTaskInsight(newTask);
      setTaskInsight(insight);

      await addDoc(collection(db, 'users', auth.currentUser.uid, 'tasks'), {
        text: newTask,
        completed: false,
        userId: auth.currentUser.uid,
        createdAt: new Date()
      });

      setNewTask('');
    } catch (error) {
      console.error("Error adding task", error);
    }
  };

  const toggleTaskCompletion = async (task) => {
    const taskRef = doc(db, 'users', auth.currentUser.uid, 'tasks', task.id);
    await updateDoc(taskRef, { completed: !task.completed });
  };

  const deleteTask = async (taskId) => {
    const taskRef = doc(db, 'users', auth.currentUser.uid, 'tasks', taskId);
    await deleteDoc(taskRef);
  };

  const editTask = async (taskId, newText) => {
    const taskRef = doc(db, 'users', auth.currentUser.uid, 'tasks', taskId);
    await updateDoc(taskRef, { text: newText });
    setEditingTaskId(null);  
    setEditedTaskText('');   
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg overflow-y-auto h-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-center text-[#958fc1]">ManageMate</h1>
          <button 
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {taskInsight && (
          <div className="bg-blue-100 p-4 rounded-lg mb-4 shadow-md">
            <p className="text-[#958fc1]">{taskInsight}</p>
          </div>
        )}

        <div className="mb-6">
          <p className="text-gray-600 mb-2">Task Completion</p>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-white bg-[#958fc1]">
                  {completedTasks} / {totalTasks} Tasks
                </span>
              </div>
            </div>
            <div className="flex mb-2">
              <div className="relative flex w-full flex-col mb-2">
                <div className="flex mb-2">
                  <div
                    className="flex-grow h-2 mb-4 bg-[#958fc1] rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex mb-4">
          <input 
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-grow p-3 border border-gray-300 rounded-l-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Enter a new task"
          />
          <button 
            onClick={addTask}
            className="bg-[#958fc1] text-white px-4 py-3 rounded-r-lg shadow-md hover:bg-[rgb(123,114,191)]"
          >
            Add Task
          </button>
        </div>

        <div className="space-y-4 overflow-y-auto max-h-96">
          {tasks.map(task => (
            <div 
              key={task.id} 
              className="flex items-center p-3 border-b border-gray-300 rounded-lg mb-4 shadow-sm hover:shadow-md transition duration-200"
            >
              <input 
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task)}
                className="mr-4"
              />
              {editingTaskId === task.id ? (
                <input
                  type="text"
                  value={editedTaskText}
                  onChange={(e) => setEditedTaskText(e.target.value)}
                  className="flex-grow p-2 border border-gray-300 rounded-md shadow-md"
                />
              ) : (
                <span className={`flex-grow ${task.completed ? 'line-through text-gray-500' : ''}`}>
                  {task.text}
                </span>
              )}
              <div className="ml-4 flex space-x-3">
                {editingTaskId === task.id ? (
                  <button
                    onClick={() => editTask(task.id, editedTaskText)}
                    className="bg-[#958fc1] text-white px-4 py-2 rounded-md shadow-md hover:bg-[rgb(123,114,191)]"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditingTaskId(task.id);
                      setEditedTaskText(task.text);
                    }}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => deleteTask(task.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
