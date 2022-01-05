import { useNavigation } from '@react-navigation/native';
import React, { useContext, useRef, useState } from 'react'
import CreateContactComponent from '../../components/CreatContactComponent'
import createContact from '../../context/actions/contacts/createContacts';
import { GlobalContext } from '../../context/Provider';
import {CONTACT_LIST} from '../../constants/routNames';


const CreateContact = () => {

  const [localFile, setLocalFile] = useState(null);
  const sheetRef = useRef(null);

  const {navigate} = useNavigation()
    const {
      contactDispatch,
      contactState: {
        createContact: {loading, error},
      },
    } = useContext(GlobalContext);
    const [form, setForm] = useState({});
    const onChangeText = ({name, value}) => {
        setForm({...form, [name]: value});
    }

    const onSubmit = () => {
        createContact(form)(contactDispatch)(() => navigate(CONTACT_LIST));
    }

    const toggleValueChange = () => {
      setForm({...form, "isFavorite": !form.isFavorite})
    }

    const closeSheet = () => {
      if(sheetRef.current) {
        sheetRef.current.close();
      }
    }

    const openSheet = () => {
      if (sheetRef.current) {
        sheetRef.current.open();
      }
    }

    const onFileSelected = (image) => {
      closeSheet();
      setLocalFile(image);
    }

    return (
      <CreateContactComponent
        sheetRef={sheetRef}
        closeSheet={closeSheet}
        openSheet={openSheet}
        toggleValueChange={toggleValueChange}
        error={error}
        loading={loading}
        form={form}
        setForm={setForm}
        onSubmit={onSubmit}
        onChangeText={onChangeText}
        onFileSelected={onFileSelected}
        localFile={localFile}
      />
    );
}

export default CreateContact;