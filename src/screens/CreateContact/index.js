import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useContext, useEffect, useRef, useState } from 'react'
import CreateContactComponent from '../../components/CreatContactComponent'
import createContact from '../../context/actions/contacts/createContacts';
import { GlobalContext } from '../../context/Provider';
import {CONTACT_DETAILS, CONTACT_LIST} from '../../constants/routNames';
import uploadImage from '../../helpers/uploadImage';
import countryCodes from '../../utils/countryCodes';
import editContact from '../../context/actions/contacts/editContact';


const CreateContact = () => {

  const [localFile, setLocalFile] = useState(null);
  const sheetRef = useRef(null);
  const {params} = useRoute();

  const {navigate} = useNavigation()
    const {
      contactDispatch,
      contactState: {
        createContact: {loading, error},
      },
    } = useContext(GlobalContext);
    const [form, setForm] = useState({});
    const[uploading, setIsUploading] = useState(false);
    const onChangeText = ({name, value}) => {
        setForm({...form, [name]: value});
    }

    const onSubmit = () => {
      if(params?.contact) {
        if (localFile?.size) {
          setIsUploading(true);
          uploadImage(localFile)(url => {
            console.log(uploading);
            setIsUploading(false);
            editContact({...form, contactPicture: url, countryCode: params.contact.country_code}, params?.contact.id)(contactDispatch)((item) => {
              navigate(CONTACT_DETAILS, {item})
            }
            );
          })(error => {
            setIsUploading(false);
          });
        } else {
          editContact({...form, countryCode: params.contact.country_code}, params.contact.id)(contactDispatch)((item) => {
            navigate(CONTACT_DETAILS, {item})
          }
          );
        }
      }else {
        if(localFile?.size) {
          setIsUploading(true);
          uploadImage(localFile)((url) => {
            setIsUploading(false);
            createContact({...form, contactPicture: url})(contactDispatch)(() => navigate(CONTACT_LIST));
          })((error) => {
            setIsUploading(false);
          })
        }else {
          createContact(form)(contactDispatch)(() => navigate(CONTACT_LIST));
        }
      }
    }

    const toggleValueChange = () => {
      setForm({...form, isFavorite: !form.isFavorite})
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

    useEffect(() => {
      if(params?.contact) {
        const {first_name: firstName, last_name: lastName, phone_number: phoneNumber, is_favorite: isFavorite, country_code: countryCode} = params.contact;
        setForm({...form, firstName, lastName, phoneNumber, isFavorite, countryCode});
        const country = countryCodes.find(item => {
          return item.value.replace('+', '') === countryCode;
        });
      
        if(country) {
          setForm(prev => {
            return {
              ...prev,
              countryCode: country.key.toUpperCase(),
            }
          })
        }

        if(params?.contact.contact_picture) {
          setLocalFile({...localFile, path: params?.contact.contact_picture});
          
        }
      }
    }, [])

    return (
      <CreateContactComponent
        sheetRef={sheetRef}
        closeSheet={closeSheet}
        openSheet={openSheet}
        toggleValueChange={toggleValueChange}
        error={error}
        loading={loading || uploading}
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