//# ==++== 
//# 
//#   
//#    Copyright (c) 2006 Microsoft Corporation.  All rights reserved.
//#   
//#    The use and distribution terms for this software are contained in the file
//#    named license.txt, which can be found in the root of this distribution.
//#    By using this software in any fashion, you are agreeing to be bound by the
//#    terms of this license.
//#   
//#    You must not remove this notice, or any other, from this software.
//#   
//# 
//# ==--== 
//####################################################################################
@cc_on


import System;

var NULL_DISPATCH = null;
var apGlobalObj;
var apPlatform;
var lFailCount;


var iTestID = 52927;


function verify(sCat, vAct, ob, bugNum)
{
    if (bugNum == null) bugNum = "";

    var vExp;
    
    if (typeof ob=="number" || typeof ob=="boolean")
        vExp = ob;
	else if (ob == null)		//special case code for ob == null
		vExp = ob + 0;
    else
        vExp = parseFloat( ob );

    if (isNaN(vExp))
      {
        if (!isNaN(vAct))
          apLogFailInfo( m_scen+(sCat.length?"--"+sCat:"")+" failed", "NaN",vAct,bugNum);
        return;
      }

    if (vExp < 0 ? vAct!=0 : vAct!=vExp)
        apLogFailInfo( m_scen+(sCat.length?"--"+sCat:"")+" failed", vExp, vAct,bugNum);
    
}

var m_scen = "";

function max001()
{
 
    apInitTest("max001 ");

    //----------------------------------------------------------------------------
    apInitScenario("1. number, decimal, integer");

    m_scen = "number, decimal, integer";

    verify("pos min", Math.max(1,0), 1, null);
    verify("pos min < n < VT_UI1 pos max", Math.max(127,0), 127, null);
    verify("VT_UI1 pos max", Math.max(255,0), 255, null);
    verify("VT_I2 pos excl-min", Math.max(256,0), 256, null);
    verify("VT_I2 pos excl-min < n < VT_I2 pos max", Math.max(12869,0), 12869, null);
    verify("VT_I2 pos max", Math.max(32767,0), 32767, null);
    verify("VT_I4 pos excl-min", Math.max(32768,0), 32768, null);
    verify("VT_I4 pos excl-min < n < pos max", Math.max(1143483646,0), 1143483646, null);
    verify("pos max", Math.max(2147483647,0), 2147483647, null);

    verify("neg max", Math.max(-1,0), -1, null);
    verify("neg max > n > VT_UI1 neg min", Math.max(-201,0), -201, null);
    verify("VT_UI1 neg min", Math.max(-256,0), -256, null);
    verify("VT_I2 neg excl-max", Math.max(-257,0), -257, null);
    verify("VT_I2 neg excl-max > n > VT_I2 neg min", Math.max(-12869,0), -12869, null);
    verify("VT_I2 neg min", Math.max(-32768,0), -32768, null);
    verify("VT_I4 neg excl-max", Math.max(-32769,0), -32769, null);
    verify("VT_I4 neg excl-max > n > neg min", Math.max(-1143483646,0), -1143483646, null);
    verify("neg min", Math.max(-2147483648,0), -2147483648, null);

    verify("zero", Math.max(0,0), 0, null);


    //----------------------------------------------------------------------------
    apInitScenario("2. number, hexidecimal");

    m_scen = "number, hexidecimal";

    verify("pos min < n < pos hex excl-min", Math.max(0xabcdef,0), 0xabcdef, null);
    verify("pos hex excl-min: 0x80000000", Math.max(0x80000000,0), 0x80000000, null);
    verify("max pos: 0xffffffff", Math.max(0xffffffff,0), 0xffffffff, null);

    verify("neg max > n > neg hex excl-max", Math.max(-0xabcdef,0), -0xabcdef, null);
    verify("pos hex excl-min: -0x80000001", Math.max(-0x80000001,0), -0x80000001, null);
    verify("min neg: -0xffffffff", Math.max(-0xffffffff,0), -0xffffffff, null);

    verify("zero", Math.max(0x0,0), 0x0, null);


    //----------------------------------------------------------------------------
    apInitScenario("3. number, octal");

    m_scen = "number, octal";

    verify("pos min < n < pos hex excl-min", Math.max(01234567,0), 01234567, null);
    verify("pos hex excl-min: 020000000000", Math.max(020000000000,0), 020000000000, null);
    verify("max pos: 037777777777", Math.max(037777777777,0), 037777777777, null);

    verify("neg max > n > neg hex excl-max", Math.max(-076543210,0), -076543210, null);
    verify("pos hex excl-min: -020000000001", Math.max(-020000000001,0), -020000000001, null);
    verify("min neg: -037777777777", Math.max(-037777777777,0), -037777777777, null);

    verify("pos zero", Math.max(00,0), 00, null);


    //----------------------------------------------------------------------------
    apInitScenario("4. number, float");

    m_scen = "number, float";

    verify("pos min",Math.max(2.2250738585072014e-308,0), 2.2250738585072014e-308, null);
    verify("pos min < n < VT_R4 pos max", Math.max(9.87654321e12,0), 9.87654321e12, null);
    verify("VT_R4 pos max", Math.max(3.402823466e+38,0), 3.402823466e+38, null);
    verify("VT_R8 pos excl-min", Math.max(3.402823467e+38,0), 3.402823467e+38, null);
    verify("VT_R8 pos excl-min < n < pos max", Math.max(4.43269743388067e107,0), 4.43269743388067e107, null);
    verify("pos max", Math.max(1.7976931348623158e308,0), 1.7976931348623158e308, null);

    verify("neg max", Math.max(-2.2250738585072012595e-308,0), -2.2250738585072012595e-308, null);
    verify("neg max > n > VT_R4 neg min", Math.max(-6.61005335930233e19,0), -6.61005335930233e19, null);
    verify("VT_R4 neg min", Math.max(-3.402823466e+38,0), -3.402823466e+38, null);
    verify("VT_R8 neg excl-max", Math.max(-3.402823467e+38,0), -3.402823467e+38, null);
    verify("VT_R8 neg excl-max > n > neg min", Math.max(-7.17170763763262e243,0), -7.17170763763262e243, null);
    verify("neg min", Math.max(-1.797693134862315807e308,0), -1.797693134862315807e308, null);

    verify("zero", Math.max(0.0,0), 0.0, null);

    
    //----------------------------------------------------------------------------
    apInitScenario("5. num string, decimal, integer");

    m_scen = "number, decimal, integer";

    verify("pos min",Math.max("1",0), "1", null);
    verify("pos min < n < VT_UI1 pos max", Math.max("127",0), "127", null);
    verify("VT_UI1 pos max", Math.max("255",0), "255", null);
    verify("VT_I2 pos excl-min", Math.max("256",0), "256", null);
    verify("VT_I2 pos excl-min < n < VT_I2 pos max", Math.max("12869",0), "12869", null);
    verify("VT_I2 pos max", Math.max("32767",0), "32767", null);
    verify("VT_I4 pos excl-min", Math.max("32768",0), "32768", null);
    verify("VT_I4 pos excl-min < n < pos max", Math.max("1143483646",0), "1143483646", null);
    verify("pos max", Math.max("2147483647",0), "2147483647", null);

    verify("neg max", Math.max("-1",0), "-1", null);
    verify("neg max > n > VT_UI1 neg min", Math.max("-201",0), "-201", null);
    verify("VT_UI1 neg min", Math.max("-256",0), "-256", null);
    verify("VT_I2 neg excl-max", Math.max("-257",0), "-257", null);
    verify("VT_I2 neg excl-max > n > VT_I2 neg min", Math.max("-12869",0), "-12869", null);
    verify("VT_I2 neg min", Math.max("-32768",0), "-32768", null);
    verify("VT_I4 neg excl-max", Math.max("-32769",0), "-32769", null);
    verify("VT_I4 neg excl-max > n > neg min", Math.max("-1143483646",0), "-1143483646", null);
    verify("neg min", Math.max("-2147483648",0), "-2147483648", null);

    verify("zero", Math.max("0",0), "0", null);


    //----------------------------------------------------------------------------
    apInitScenario("7. num string, octal");

    m_scen = "num string, octal";

    verify("pos min < n < pos hex excl-min", Math.max("01234567",0), "01234567", null);
    verify("pos hex excl-min: 020000000000", Math.max("020000000000",0), "020000000000", null);
    verify("max pos: 037777777777", Math.max("037777777777",0), "037777777777", null);

    verify("neg max > n > neg hex excl-max", Math.max("-076543210",0), "-076543210", null);
    verify("pos hex excl-min: -020000000001", Math.max("-020000000001",0), "-020000000001", null);
    verify("min neg: -037777777777", Math.max("-037777777777",0), "-037777777777", null);

    verify("pos zero", Math.max("00",0), "00", null);


    //----------------------------------------------------------------------------
    apInitScenario("8. num string, float");

    m_scen = "number, float";

    verify("pos min", Math.max("2.2250738585072014e-308",0), "2.2250738585072014e-308", null);
    verify("pos min < n < VT_R4 pos max", Math.max("9.87654321e12",0), "9.87654321e12", null);
    verify("VT_R4 pos max", Math.max("3.402823466e+38",0), "3.402823466e+38", null);
    verify("VT_R8 pos excl-min", Math.max("3.402823467e+38",0), "3.402823467e+38", null);
    verify("VT_R8 pos excl-min < n < pos max", Math.max("4.43269743388067e107",0), "4.43269743388067e107", null);
    verify("pos max", Math.max("1.7976931348623158e308",0), "1.7976931348623158e308", null);

    verify("neg max", Math.max("-2.2250738585072012595e-308",0), "-2.2250738585072012595e-308", null);
    verify("neg max > n > VT_R4 neg min", Math.max("-6.61005335930233e19",0), "-6.61005335930233e19", null);
    verify("VT_R4 neg min", Math.max("-3.402823466e+38",0), "-3.402823466e+38", null);
    verify("VT_R8 neg excl-max", Math.max("-3.402823467e+38",0), "-3.402823467e+38", null);
    verify("VT_R8 neg excl-max > n > neg min", Math.max("-7.17170763763262e243",0), "-7.17170763763262e243", null);
    verify("neg min", Math.max("-1.797693134862315807e308",0), "-1.797693134862315807e308", null);

    verify("zero", Math.max("0.0",0), "0.0", null);

    
    //----------------------------------------------------------------------------
    apInitScenario("13. constants");

    m_scen = "constants";

    verify("true",Math.max(true,0), 1, null);
    verify("false",Math.max(false,0), 0, null);


    //----------------------------------------------------------------------------
    apInitScenario("14. null");

    m_scen = "null";

    verify("",Math.max(null,0), null, null);


    apEndTest();

}


max001();


if(lFailCount >= 0) System.Environment.ExitCode = lFailCount;
else System.Environment.ExitCode = 1;

function apInitTest(stTestName) {
    lFailCount = 0;

    apGlobalObj = new Object();
    apGlobalObj.apGetPlatform = function Funca() { return "Rotor" }
    apGlobalObj.LangHost = function Funcb() { return 1033;}
    apGlobalObj.apGetLangExt = function Funcc(num) { return "EN"; }

    apPlatform = apGlobalObj.apGetPlatform();
    var sVer = "1.0";  //navigator.appVersion.toUpperCase().charAt(navigator.appVersion.toUpperCase().indexOf("MSIE")+5);
    apGlobalObj.apGetHost = function Funcp() { return "Rotor " + sVer; }
    print ("apInitTest: " + stTestName);
}

function apInitScenario(stScenarioName) {print( "\tapInitScenario: " + stScenarioName);}

function apLogFailInfo(stMessage, stExpected, stActual, stBugNum) {
    lFailCount = lFailCount + 1;
    print ("***** FAILED:");
    print ("\t\t" + stMessage);
    print ("\t\tExpected: " + stExpected);
    print ("\t\tActual: " + stActual);
}

function apGetLocale(){ return 1033; }
function apWriteDebug(s) { print("dbg ---> " + s) }
function apEndTest() {}