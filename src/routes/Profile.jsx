import { updateProfile } from 'firebase/auth';
import { nanoid } from 'nanoid';
import { string } from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import checkIcon from '../assets/checkIcon.svg';
import editIcon from '../assets/editIcon.svg';
import { UserContext } from '../contexts/UserContext';

function ProfileRow({ rowName, rowVal }) {
  const { darkMode } = useContext(UserContext);
  const { register, handleSubmit } = useForm({
    defaultValues: { [rowName]: rowVal },
  });
  const [editing, setEditing] = useState(false);

  function edit() {
    setEditing(true);
    console.log(JSON.parse(localStorage.getItem('user')));
  }

  async function onSubmit(data) {
    setEditing(false);
    await updateProfile(auth.currentUser, { displayName: data.name });
    window.location.reload();
  }

  return (
    <tr>
      <td className="px-4 py-2 border border-slate-400 dark:border-slate-700 text-slate-500 text-sm">
        {rowName.toUpperCase()}
      </td>
      <td className="px-4 py-2 border border-slate-400 dark:border-slate-700">
        {editing ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex justify-between items-center gap-8"
          >
            <input
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              type="text"
              {...register(rowName)}
              className="py-[6px] bg-transparent rounded focus:outline focus:outline-1 focus:outline-blue-500"
            />
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              className="btn-secondary p-2"
            >
              <img
                src={checkIcon}
                alt=""
                width={20}
                height={20}
                className={darkMode ? 'invert opacity-70' : ''}
              />
            </button>
          </form>
        ) : (
          <div className="flex justify-between items-center gap-8">
            <p>{rowVal}</p>
            <button
              type="button"
              onClick={edit}
              className="btn-secondary p-2"
            >
              <img
                src={editIcon}
                alt=""
                width={20}
                height={20}
                className={darkMode ? 'invert opacity-70' : ''}
              />
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}

export default function Profile() {
  const { currentUser } = useContext(UserContext);
  const nav = useNavigate();

  const info = [
    ['name', currentUser?.displayName],
    ['bio', currentUser?.bio],
    ['phone', currentUser?.phoneNumber],
    ['email', currentUser?.email],
    ['password', currentUser?.password],
  ];

  const infoRows = info.map((row) => (
    <ProfileRow
      rowName={row[0]}
      rowVal={row[1]}
      key={nanoid()}
    />
  ));

  useEffect(() => {
    if (!currentUser) nav('/login');
  }, [currentUser, nav]);

  return (
    <div id="Profile">
      <table className="table-fixed w-full border-collapse border-spacing-2 border border-slate-400 dark:border-slate-700 rounded-lg">
        <colgroup>
          <col className="w-40" />
        </colgroup>
        <thead>
          <tr>
            <th colSpan={2}>
              <div className="p-4">
                <p className="text-left text-2xl">Profile</p>
                <p className="text-left font-normal">Some info may be visible to other people</p>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2 border border-slate-400 dark:border-slate-700 text-slate-500 text-sm">
              PHOTO
            </td>
            <td className="px-4 py-2 border border-slate-400 dark:border-slate-700">
              <img
                src={currentUser?.photoURL}
                alt=""
                className="rounded object-cover w-24 h-24"
              />
            </td>
          </tr>
          {infoRows}
        </tbody>
      </table>
    </div>
  );
}

ProfileRow.propTypes = {
  rowName: string.isRequired,
  rowVal: string,
};

ProfileRow.defaultProps = {
  rowVal: undefined,
};
