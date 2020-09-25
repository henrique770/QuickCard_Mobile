import React, {useRef, useState, useEffect} from 'react';
import Spacing from '~/components/Spacing';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  View,
  Picker,
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
  const notePad = useSelector(state => state.notepad.data.find( e => e.Id == note.IdNotePad));
  const dispatch = useDispatch();

  const [selectedStyles, setSelectedStyles] = useState([]);

  const [title, setTitle] = useState(note.Title);
  const [content, setContent] = useState(note.Content);

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

  const handlerUpdateNote = async () => {
    let value = await editor.getHtml()

    note.Content = value;
    note.Title = title;

    console.log('Note', note)

    dispatch(updateNote(note))
    dispatch(getNotePads())

   /* dispatch(addNote({
      Content : value
      , IdNotePad : notePad
      , Title :title
    }))
    */
  }

  const onStyleKeyPress = toolType => {
    editor.applyToolbar(toolType);
  };

  function renderHead() {
    return(
      <Spacing mb="20">
        <Spacing position="absolute" top="5" right="35" width="50">
          <ContainerTag>
            <IconMc name="tag" size={20} color="#fe650e" />
            <Text> Bloco: { notePad.Name } </Text>
          </ContainerTag>
        </Spacing>
      </Spacing>
    )
  }

  function renderTitle() {
    return(
      <Spacing ml="20" mr="20">
        <Title onChangeText={(value) => setTitle(value)}>{title}</Title>
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
                //onSelectedTagChanged={onSelectedTagChanged}
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
