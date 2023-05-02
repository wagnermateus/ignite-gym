import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Center, ScrollView, Skeleton, VStack } from "native-base";
import { useState } from "react";

export function Profile() {
  const [photoIsLoaded, setPhotoIsLoaded] = useState(true);
  const PHOTO_SIZE = 33;
  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />
      <ScrollView>
        <Center mt={6} px={10}>
          <Skeleton
            w={PHOTO_SIZE}
            h={PHOTO_SIZE}
            rounded="full"
            startColor="gray.500"
            endColor="gray.400"
            isLoaded={photoIsLoaded}
          />
          {photoIsLoaded && (
            <UserPhoto
              source={{ uri: "https://github.com/wagnermateus.png" }}
              alt="Foto do usuário"
              size={33}
            />
          )}
        </Center>
      </ScrollView>
    </VStack>
  );
}
