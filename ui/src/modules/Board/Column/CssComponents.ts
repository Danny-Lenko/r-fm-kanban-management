import { Stack, Box, BoxProps, ButtonProps } from '@mui/material';
import { styled } from '@mui/system';
import { CssAddButton } from '..';

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

interface Props extends ButtonProps {
   tasksnum: number;
}

export const CssTaskButton = styled(CssAddButton)<Props>(
   ({ theme, tasksnum }) => ({
      padding: '28px 0',
      border: `3px solid ${theme.palette.divider}`,
      background: 'transparent',
      maxWidth: '100%',
      fontSize: 'larger',
      transform: tasksnum === 0 ? 'translateY(-20px)' : 'none',
   }),
);
