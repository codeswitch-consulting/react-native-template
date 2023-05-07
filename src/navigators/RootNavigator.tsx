import React, {useEffect, useContext, useRef} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {SampleScreen} from '@screens/sample/SampleScreen';
import {AppContext} from '@contexts/AppProvider';
import {ROUTES} from '@utils/navigation';

export type RootNavStackParams = {
  auth: undefined;
  app: undefined;
};

const Stack = createNativeStackNavigator<RootNavStackParams>();

export const RootNavigator: React.FC<{}> = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.APP as keyof RootNavStackParams}
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={ROUTES.AUTH as keyof RootNavStackParams}
        component={SampleScreen}
      />
      <Stack.Screen
        name={ROUTES.APP as keyof RootNavStackParams}
        component={SampleScreen}
      />
    </Stack.Navigator>
  );
};
