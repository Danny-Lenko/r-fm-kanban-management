import { Stack, Box, BoxProps } from '@mui/material';
import { styled } from '@mui/system';

export const CssColumn = styled(Stack)({
   minWidth: '280px',
   maxWidth: '280px',
   paddingRight: '4px',
});
CssColumn.defaultProps = {
   spacing: 2.5,
};

interface ColorLabel extends BoxProps {
   color: string;
}
export const CssColorLabel = styled(Box)<ColorLabel>(({ color }) => ({
   backgroundColor: color,
   width: '15px',
   borderRadius: '50%',
}));
