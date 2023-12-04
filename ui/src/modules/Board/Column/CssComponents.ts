import { Stack, Box, BoxProps, ButtonProps, Typography } from '@mui/material';
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
   minWidth: '15px',
   maxWidth: '15px',
   height: '15px',
   borderRadius: '50%',
}));

export const CssNameContainer = styled(Typography)({
   textTransform: 'uppercase',
   display: 'flex',
   alignItems: 'center',
});
CssNameContainer.defaultProps = {
   variant: 'h5',
};

export const CssName = styled('span')({
   display: 'inline-block',
   maxWidth: 200,
   overflow: 'hidden',
   textOverflow: 'ellipsis',
   whiteSpace: 'nowrap',
   marginRight: 4,
});

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
