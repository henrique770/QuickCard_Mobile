import React, {useRef, useState, useEffect} from 'react';
import Spacing from '~/components/Spacing';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  View,
  Picker,
  Alert,
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
import {getNotePads, updateNote} from "~/store/modules/notepad/actions";
import {withTheme} from "styled-components";
import { Messenger , NotePad as NotePadConstantsBusiness} from '~constants/ConstantsBusiness'

const defaultStyles = getDefaultStyles();

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

function Note({navigation, ...props}) {

  let editor = null

  const note = props.route.params
  const notePads = useSelector(state => state.notepad.data);
  const notePad = useSelector(state => state.notepad.data.find( e => e.Id == note.IdNotePad));

  const dispatch = useDispatch();

  const [selectedStyles, setSelectedStyles] = useState([]);

  const [title, setTitle] = useState(note.Title);
  const [content, setContent] = useState(note.Content);
  const [notePadSelected, setNotePadSelected] = useState(notePad.Id);

  //#region EDITOR TOOL OPTIONS

  const editorOptions = [{
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
      },
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
                  onPress={ () => handlerUpdateNote()}>
                  <Text style={styles.toolbarButton}>
                    <IconMc
                      name="content-save"
                      color="#fe650e"
                      size={30}
                    />
                  </Text>
                </TouchableOpacity>
              ),
            },
          ],
        },
      ];

  //#endregion

  const onSelectedTagChanged = async () => {
    
    let value = await editor.getHtml()
    note.Content = value

    if(note.processTitleEmpty(value) === title) {

    }

    if(note.IsEmptyTitle) {

      setTitle(note.Title)
    }
  }

  const onSelectedTitleChanged = title => {

    if(note.IsEmptyTitle) {
      
      note.IsEmptyTitle = false
      setTitle('')
      
      return
    }

    setTitle(title)
    return
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

  const handlerUpdateNote = async () => {
    let value = await editor.getHtml()

    note.Content = value;
    note.Title = title;
    note.IsEmptyTitle = false;
    note.IdNotePad = notePadSelected;

    console.log('Note', note)

    if(note.Content === '') {
      Alert.alert(Messenger.MSG000, Messenger.MSG028)
      return
    }

    dispatch(updateNote(note))
    dispatch(getNotePads())
  }

  const onStyleKeyPress = toolType => {
    editor.applyToolbar(toolType);
  };

  function renderHead() {
    return (
      <Spacing mb="20">
      <Spacing position="absolute" top="5" right="30" width="75">
        <ContainerTag>

          <IconMc name="tag" size={20} color="#fe650e" />

          <Picker
            style={{
              height: 50,
              width: '100%',
            }}
              selectedValue={notePadSelected}
              onValueChange={(itemValue, itemIndex) => { setNotePadSelected(itemValue) }
            }>

            {getListTag()}

          </Picker>

        </ContainerTag>
      </Spacing>
    </Spacing>
    )
  }

  function renderTitle() {
    return(
      <Spacing ml="20" mr="20">
        <Title onChangeText={onSelectedTitleChanged}>{title}</Title>
      </Spacing>
    )
  }

  function renderToolbar() {
    return (
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
          iconSet={editorOptions}
          //selectedTag={selectedTag}
          selectedStyles={selectedStyles}
          onStyleKeyPress={onStyleKeyPress}
        />
      </View>
    )
  }

  return (
    <>
      <Container>

        { renderHead() }
        { renderTitle() }

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
                //onSelectedStyleChanged={onSelectedStyleChanged}
                style={{backgroundColor: '#fff'}}
                styleList={defaultStyles}
                initialHtml={content}
                
              />
            </View>
          </View>

          {renderToolbar()}

        </KeyboardAvoidingView>
      </Container>
    </>
  );
}

export default withTheme(Note);