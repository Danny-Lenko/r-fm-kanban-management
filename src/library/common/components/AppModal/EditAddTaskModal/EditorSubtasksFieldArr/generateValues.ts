export const generateValues = (index: number) => {
   const placeholders = [
      'e.g. Make coffee',
      'e.g. Drink coffee and smile',
      'e.g. Make coffee to friends',
      'e.g. Invite friends for coffee',
      'e.g. Drink coffee with friends',
   ];

   const placeholder =
      placeholders[index] || 'e.g. Seems like no time for coffee anymore';

   return { placeholder };
};
