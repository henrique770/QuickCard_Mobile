import React, {useRef, useState, useEffect} from 'react';
import Spacing from '~/components/Spacing';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  View,
  Picker,
  Alert
} from 'react-native';

import CNEditor, {
  CNToolbar,
  getDefaultStyles,
} from 'react-native-cn-richtext-editor';

import PropTypes from 'prop-types';
import IconMi from 'react-native-vector-icons/MaterialIcons';
import IconMc from 'react-native-vector-icons/MaterialCommunityIcons';
import {Container, Title, ContainerTag, TagInput} from './styles';
import {useDispatch, useSelector} from "react-redux";
import {addNote , getNotePads } from "~/store/modules/notepad/actions";
import { Messenger, Note as NoteConstantsBusiness, NotePad as NotePadConstantsBusiness } from '~constants/ConstantsBusiness'

const defaultStyles = getDefaultStyles();

export default function AddNote({navigation, route}) {

  let editor = null
  const notePads = useSelector(state => state.notepad.data);
  const dispatch = useDispatch();

  const [noteContent , setNoteContent] = useState('');
  const [selectedTag, setSelectedValue] = useState('');
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [notePad, setNotePad] = useState('');
  const [title, setTitle] = useState(NoteConstantsBusiness.defaultTitle);

  dispatch(getNotePads())

  const handlerAddNote = () => {

    if(noteContent == ""){
      Alert.alert(Messenger.MSG000, Messenger.MSG028)
      return
    }

    //if(notePad == '') {
    //  Alert.alert('', 'Selecione um bloco de anotação')
    //  return
    //}

    dispatch(addNote({
        Content : noteContent
        , IdNotePad : notePad
        , Title : title
        , IsEmptyTitle : false
    }))

    setSelectedValue('')
    setTitle(NoteConstantsBusiness.defaultTitle)
    setNotePad('')
    setNoteContent('')
    editor.setHtml('')

    Alert.alert(Messenger.MSG000, Messenger.MSG029)
  }

  const onStyleKeyPress = toolType => {
    editor.applyToolbar(toolType);
  };

  const  onSelectedTagChanged = tag => {
    setSelectedValue(tag)
  };

  const onSelectedStyleChanged = styles => {
    setSelectedStyles(styles)
  };

  const onValueChanged = value => {
    setNoteContent(value)
  }

  const getListTag = () => {

    let selectValues = []

    if(notePads != null && Array.isArray(notePads)) {
      selectValues = [
        { id : '' , name : NotePadConstantsBusiness.defaultNotePadName } 
          , ...notePads.filter( e => e.Id !== '' ).map( e => { return{ id : e.Id , name : e.Name} }) 
      ]
    }

    return selectValues.map( note => {
      return <Picker.Item label={note.name} value={note.id} />
    })
  }

    return (
      <>
        <Container>
          <Spacing mb="20">
            <Spacing position="absolute" top="5" right="30" width="75">
              <ContainerTag>

                <IconMc name="tag" size={20} color="#fe650e" />

                <Picker
                  style={{
                    height: 50,
                    width: '100%',
                  }}
                    selectedValue={notePad}
                    onValueChange={(itemValue, itemIndex) => { setNotePad(itemValue) }
                  }>

                  {getListTag()}

                </Picker>

              </ContainerTag>
            </Spacing>
          </Spacing>

          <Spacing ml="20" mr="20">
            <Title onChangeText={(value) => setTitle(value)}>{title}</Title>
          </Spacing>

          <KeyboardAvoidingView
            enabled
            keyboardVerticalOffset={0}
            style={{
              flex: 1,
              backgroundColor: '#fff',
              flexDirection: 'column',
              justifyContent: 'flex-end',
            }}>

            <View
              style={{flex: 1}}
              onTouchStart={() => {
                editor && editor.blur();
              }}>

              <View style={styles.main} onTouchStart={e => e.stopPropagation()}>
                <CNEditor
                  ref={input => (editor = input)}
                  onSelectedTagChanged={onSelectedTagChanged}
                  onSelectedStyleChanged={onSelectedStyleChanged}
                  onValueChanged={onValueChanged}
                  style={{backgroundColor: '#fff'}}
                  styleList={defaultStyles}
                  initialHtml={noteContent}
                />
              </View>

            </View>

            <View
              style={{
                minHeight: 35,
              }}>
              <CNToolbar
                style={{
                  height: 45,
                }}
                iconSetContainerStyle={{
                  flexGrow: 1,
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}
                size={30}
                iconSet={[
                  {
                    type: 'tool',
                    iconArray: [
                      {
                        toolTypeText: 'bold',
                        buttonTypes: 'style',
                        iconComponent: (
                          <Text style={styles.toolbarButton}>
                            <IconMi name="format-bold" size={30} />
                          </Text>
                        ),
                      },
                    ],
                  }
                  ,
                  {
                    type: 'tool',
                    iconArray: [
                      {
                        toolTypeText: 'italic',
                        buttonTypes: 'tag',
                        iconComponent: (
                          <Text style={styles.toolbarButton}>
                            <IconMi name="format-italic" size={30} />
                          </Text>
                        ),
                      },
                    ],
                  },
                  {
                    type: 'tool',
                    iconArray: [
                      {
                        toolTypeText: 'ul',
                        buttonTypes: 'tag',
                        iconComponent: (
                          <Text style={styles.toolbarButton}>
                            <IconMi name="format-list-bulleted" size={30} />
                          </Text>
                        ),
                      },
                    ],
                  },
                  {
                    type: 'tool',
                    iconArray: [
                      {
                        toolTypeText: 'ol',
                        buttonTypes: 'tag',
                        iconComponent: (
                          <Text style={styles.toolbarButton}>
                            <IconMi name="format-list-numbered" size={30} />
                          </Text>
                        ),
                      },
                    ],
                  },
                  {
                    type: 'tool',
                    iconArray: [
                      {
                        iconComponent: (
                          <TouchableOpacity
                            onPress={handlerAddNote
                              //navigation.navigate('AddCard')
                            }>
                            <Text style={styles.toolbarButton}>
                              <IconMc
                                name="library-plus"
                                color="#fe650e"
                                size={30}
                              />
                            </Text>
                          </TouchableOpacity>
                        ),
                      },
                    ],
                  },
                ]}
                selectedTag={selectedTag}
                selectedStyles={selectedStyles}
                onStyleKeyPress={onStyleKeyPress}
              />
            </View>
          </KeyboardAvoidingView>
        </Container>
      </>
    );
}
var styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 1,
    alignItems: 'stretch',
  },
  toolbarButton: {
    fontSize: 20,
    width: 28,
    height: 28,
    textAlign: 'center',
  },
  italicButton: {
    fontStyle: 'italic',
  },
  boldButton: {
    fontWeight: 'bold',
  },
  underlineButton: {
    textDecorationLine: 'underline',
  },
  lineThroughButton: {
    textDecorationLine: 'line-through',
  },
});

AddNote.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
