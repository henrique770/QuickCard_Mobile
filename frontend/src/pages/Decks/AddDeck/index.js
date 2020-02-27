import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';
// import { updateProfileRequest } from '~/store/modules/user/actions';

import {
    Container,
    Title,
    Separator,
    Form,
    FormInput,
    SubmitButton,
} from './styles';

export default function AddDeck({navigation}) {
    // const dispatch = useDispatch();
    // const profile = useSelector(state => state.user.profile);

    const [deckname, setDeckname] = useState('');

    // useEffect(() => {
    //     setOldPassword('');
    //     setPassword('');
    //     setConfirmPassword('');
    // }, [profile]);

    function handleSubmit() {
        // dispatch(
        //     updateProfileRequest({
        //         name,
        //         email,
        //         password,
        //         oldPassword,
        //         confirmPassword,
        //     })
        // );
    }



    return (
        <Background>
            <Container>
            <View style={styles.back_icon}>
            <TouchableOpacity onPress={() => navigation.navigate('Decks')}>
            <Icon name="arrow-back" size={30} color="#FFF" />
            </TouchableOpacity>
            </View>
                <Title>Adicionar Baralho</Title>

                <Form>
                    <FormInput
                        icon="cards"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Nome do Baralho"
                        returnKeyType="next"
                        value={deckname}
                        onChangeText={setDeckname}
                    />

                    <Separator />


                    <SubmitButton onPress={handleSubmit}>
                        Salvar
                    </SubmitButton>

                </Form>
            </Container>
        </Background>
    );
}
AddDeck.navigationOptions = {
  tabBarLabel: 'Criar Baralho',
  tabBarIcon: ({ tintColor }) => (
      <Icon name="event" size={20} color={tintColor} />
  ),
};


const styles = StyleSheet.create({
  back_icon: {
    position: "absolute",
    left: 30,
    top: 30,
  }

});
