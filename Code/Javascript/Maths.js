const Maths =
{
    Lerp: function Lerp(a, b, t)
    {
        return a + (b - a) * t;
    },

    InverseLerp: function Lerp(a, b, t)
    {
        return (t - a)/(b - a);
    },
}