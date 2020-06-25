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
// import ActionButton from 'react-native-action-button';
import PropTypes from 'prop-types';
import IconMi from 'react-native-vector-icons/MaterialIcons';
import IconMc from 'react-native-vector-icons/MaterialCommunityIcons';
import {Container, Title, ContainerTag, TagInput} from './styles';
import {useSelector} from "react-redux";

const defaultStyles = getDefaultStyles();

export default function AddNote({navigation, route}) {

  let editor = null
  const notePads = useSelector(state => state.notepad.data);

  console.log(notePads)

  const [selectedTag, setSelectedValue] = useState('body');
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [notePad, setNotePad] = useState('');
  const [title, setTitle] = useState('Título');



  /*
  constructor(props) {
    super(props);

    this.state = {
      selectedTag: 'body',
      selectedStyles: [],
      language: 'java',
    };
    //this.notePads = useSelector(state => state.notePad.data);
    console.log(notePads)
    this.editor = null;
  }
  */

  const handlerAddNote = async () => {
    let value = await editor.getHtml()
    console.log({
      value
      , notePad
      , title
    })
  }

  const onStyleKeyPress = toolType => {
    editor.applyToolbar(toolType);
  };

  const  onSelectedTagChanged = tag => {
    //this.setState({
    //  selectedTag: tag,
    //});
    setSelectedValue(tag)
  };

  const onSelectedStyleChanged = styles => {
    //this.setState({
    //  selectedStyles: styles,
    //});
    setSelectedStyles(styles)
  };

  const getListTag = () => {
    let selectValues = [{ id : '' , name : 'Selecione' } , ...notePads.map( e => { return{ id : e.Id , name : e.Name} }) ]
    /*
      , response = []
    selectValues.map(note => {
      response.push()
    })
    return response;
    */
    console.log(selectValues)

    return selectValues.map( note => {
      return <Picker.Item label={note.name} value={note.id} />
    })
  }

    return (
      <>
        <Container>
          <Spacing mb="20">
            <Spacing position="absolute" top="5" right="30" width="50">
              <ContainerTag>
                <IconMc name="tag" size={20} color="#fe650e" />

                <Picker
                  style={{
                    height: 50,
                    width: '100%',
                  }}
                  selectedValue={notePad}
                  onValueChange={(itemValue, itemIndex) => {
                      console.log('Item value : ', itemValue);
                      //setState({language: itemValue})
                      setNotePad(itemValue)
                    }
                  }>
                  {getListTag()}
                </Picker>
                {/* <TagInput
                  autoCorrect={false}
                  autoCapitalize="none"
                  placeholder="Tag Baralho"
                /> */}
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
                  style={{backgroundColor: '#fff'}}
                  styleList={defaultStyles}
                  initialHtml={`  `}
                />
                {/* <p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href="#">Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p> */}
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
                  // {
                  //   type: 'tool',
                  //   iconArray: [
                  //     {
                  //       buttonTypes: 'style',
                  //       toolTypeText: 'image',
                  //       iconComponent: (
                  //         <Text style={styles.toolbarButton}>
                  //           <IconMi name="image" size={30} />
                  //         </Text>
                  //       ),
                  //     },
                  //   ],
                  // },
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

          {/* <ActionButton
            style={{
              marginBottom: 30,
            }}
            buttonColor="#f93b10">
            <ActionButton.Item
              buttonColor="#333"
              title="Adicionar Cartão"
              textContainerStyle={{
                height: 25,
              }}
              textStyle={{
                fontSize: 13,
              }}
              onPress={() => this.props.navigation.navigate('AddCard')}>
              <IconMc name="cards-outline" size={30} color="#FFF" />
            </ActionButton.Item>
          </ActionButton> */}
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
